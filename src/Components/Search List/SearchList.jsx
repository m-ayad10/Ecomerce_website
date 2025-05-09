import { debounce, slice } from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { SearchQueryContext } from "../../Consonant/SearchQuery";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function SearchList() {
  const { searchQuery, setSearchQuery } = useContext(SearchQueryContext);
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("all-products");
  const [gender, setGender] = useState("all");
  const [sortOrder, setSortOrder] = useState("priceLowHigh");
  const navigate=useNavigate()
const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);

  // Monitor user authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch wishlist for the authenticated user
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) return;

      try {
        const userWishlistSnapshot = await getDocs(
          collection(db, 'Users', userId, 'Wishlist')
        );
        const wishlistItems = userWishlistSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWishlist(wishlistItems);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [userId]);

  const addToWishlist = async (item) => {
    
    try {
      // Check if imageUrl exists, if not, use a placeholder image
      const imageUrl = item.imageUrls && item.imageUrls[0]?.url ? item.imageUrls[0]?.url : 'path/to/placeholder-image.jpg';
  
      const userWishlistRef = collection(db, 'Users', userId, 'Wishlist');
  
      const wishlistItem = {
        name: item.name,
        imageUrl: imageUrl, // Ensure a valid imageUrl is passed
        productId: item.id,
        gender: item.gender,
        category: item.category,
        price: item.price,
      };
  
      // Add the wishlist item to Firestore
      await addDoc(userWishlistRef, wishlistItem);
  
      // Refetch the updated wishlist
      const userWishlistSnapshot = await getDocs(userWishlistRef);
      const updatedWishlist = userWishlistSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setWishlist(updatedWishlist);
  
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (product) => {
    
  
    try {
      console.log('Removing product:', product);
  
      // Find the wishlist item
      const wishlistItem = wishlist.find((item) => item.productId === product.id);
  
      if (!wishlistItem || !wishlistItem.id) {
        console.error('Wishlist item not found or missing ID:', product.id);
        Swal.fire('Error', 'Item not found in wishlist.', 'error');
        return;
      }
  
      const userWishlistDocRef = doc(
        db,
        'Users',
        userId,
        'Wishlist',
        wishlistItem.id
      );
  
      // Remove the item from Firestore
      await deleteDoc(userWishlistDocRef);
  
      // Refetch the updated wishlist
      const userWishlistSnapshot = await getDocs(
        collection(db, 'Users', userId, 'Wishlist')
      );
      const updatedWishlist = userWishlistSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setWishlist(updatedWishlist);
  
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };
  
  


  // Fetching data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProduct(newData);
    };
    fetchData();
  }, []);

  // Apply filters to products based on searchQuery, category, and gender
  const filterProducts = () => {
    let filtered = [];

  // Apply search query filter if it exists
  if (searchQuery && searchQuery.trim() !== '') {
    filtered = product.filter((obj) =>
      obj.name && obj.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else {
    // If the searchQuery is empty or null, show all products
    filtered = [...product];
  }
    
    
        
    // Filter by category
    if (category !== "all-products") {
      filtered = filtered.filter((obj) => obj.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by gender
    if (gender !== "all") {
      filtered = filtered.filter((obj) => obj.gender.toLowerCase() === gender.toLowerCase());
    }

    // Sorting logic
    if (sortOrder === "priceLowHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "priceHighLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "latest") {
      filtered = filtered.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
    } else if (sortOrder === "oldest") {
      filtered = filtered.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
    }

    setFilteredProducts(filtered);
  };

  // Handle search input change (debounced)
  const handleSearchChange = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  // Handle category change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Handle gender change
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Whenever searchQuery, category, gender, or sortOrder changes, filter the products
  useEffect(() => {
    filterProducts();
  }, [searchQuery, category, gender, sortOrder, product]);

  // Pagination
  const [index, setIndex] = useState(15);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsCompleted(index >= filteredProducts.length);
  }, [index, filteredProducts]);

  const loadMore = () => {
    if (index < filteredProducts.length) {
      setIndex((prevIndex) => prevIndex + 15);
    }
  };

    // Add product to cart
    const addToCart = async (obj) => {
      const user = auth.currentUser;
      if (!userId) {
        Swal.fire('Error', 'Please log in to add items to your cart.', 'error');
        return;
      }
  
      try {
        const cartDocRef = doc(db, 'Users', userId, 'Cart', 'cart');
        const cartDocSnap = await getDoc(cartDocRef);
        let cartData = cartDocSnap.exists() ? cartDocSnap.data() : { items: [], TotalPrice: 0 };
  
        const existingProductIndex = cartData.items.findIndex(
          (item) => item.productId === obj.id
        );
  
        if (existingProductIndex !== -1) {
          cartData.items[existingProductIndex].quantity += 1;
          cartData.items[existingProductIndex].subTotal =
            obj.price * cartData.items[existingProductIndex].quantity;
        } else {
          cartData.items.push({
            id: 'id-' + Math.random().toString(36).substr(2, 9),
            name: obj.name,
            price: obj.price,
            size: 'sm',
            productId: obj.id,
            imageUrl: obj.imageUrls[0]?.url || '',
            quantity: 1,
            subTotal: obj.price,
          });
        }
  
        cartData.TotalPrice = cartData.items.reduce(
          (total, item) => total + item.subTotal,
          0
        );
  
        await setDoc(cartDocRef, cartData);
  Swal.fire({
          title: 'Success!',
          text: 'Added to Cart',
          icon: 'success',
          confirmButtonText: 'Ok',
          customClass: {
            popup: 'custom-swal-popup',
          },
        });
          } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    };
  

    return (
      <div>
        {/* Search and Filters */}
        <div className="productCard-border">
          <div className="d-flex flex-wrap justify-content-md-between">
            <input
              type="search"
              className="p-1 search-input outline-none border-2"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search..."
            />
            <div className="d-flex flex-wrap">
              {/* Category Filter */}
              <label htmlFor="category-filter" className="p-2">
                Category:
              </label>
              <select
                id="category-filter"
                className="form-selec ms-2 p-1 m-1"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="all-products">All Products</option>
                <option value="shirt">Shirt</option>
                <option value="pant">Pant</option>
                <option value="t-shirt">T-Shirt</option>
                <option value="top">Top</option>
                <option value="hoodie">Hoodie</option>
              </select>
  
              {/* Gender Filter */}
              <label htmlFor="gender-filter" className="p-2">
                Gender:
              </label>
              <select
                id="gender-filter"
                className="form-selec ms-2 p-1 m-1"
                value={gender}
                onChange={handleGenderChange}
              >
                <option value="all">All</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
  
              {/* Sort Filter */}
              <label htmlFor="sort-filter" className="p-2">
                Sort:
              </label>
              <select
                id="sort-filter"
                className="form-selec ms-2 p-1 m-1"
                value={sortOrder}
                onChange={handleSortChange}
              >
                <option value="priceLowHigh">Price low to high</option>
                <option value="priceHighLow">Price high to low</option>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
          <hr className="w-100 m-2" />
  
          {/* Product Cards */}
          {filteredProducts.length === 0 ? (
            <div className="d-flex justify-content-center p-5">
              <p>No results found</p>
            </div>
          ) : (
            <div className="card-container">
              {filteredProducts.slice(0, index).map((obj) => {
                const isWishlisted = wishlist.some(
                  (item) => item.productId === obj.id
                );
  
                return (
                  <div className="card-box bg-light" key={obj.id}>
                    {/* Image Section */}
                    <div className="d-flex justify-content-center">
                      <div className="card-box-image-container">
                        <div className="card-image-box">
                          <img
                            src={
                              obj.imageUrls[0]?.url ||
                              'path/to/placeholder-image.jpg'
                            }
                            className="card-box-image cursor-p"
                            alt={obj.name || 'Product Image'}
                            onClick={() => navigate(`/category/${obj.id}`)}
                          />
                          <div className="card-icon-cont">
                            <i
                              className={`cursor-p card-font-icon ${
                                isWishlisted
                                  ? 'fa-solid fa-heart'
                                  : 'fa-regular fa-heart'
                              }`}
                              style={isWishlisted ? { color: '#FF5A5F' } : {}}
                              onClick={() =>
                                isWishlisted
                                  ? removeFromWishlist(obj)
                                  : addToWishlist(obj)
                              }
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    {/* Content Section */}
                    <div className="card-box-content">
                       <p className='productCard-name'>{obj.name}
                </p>
                  <p className="productCard-category">{obj.category}</p>
                  <div className="d-flex justify-content-between">
                    <p className="productCard-price">
                      ₹ {obj.price}
                    </p>
                        <i
                          className="fa-solid fa-cart-plus productCard-cart cursor-p"
                          onClick={() => addToCart(obj)}
                        ></i>
                      </div>
                    </div>
                  </div>
                );
              })}
  
              {/* Load More Button */}
              
            </div>
          )}
          {filteredProducts.length > 0 && !isCompleted && (
                <div className="d-flex justify-content-center mt-2">
                  <button
                    onClick={loadMore}
                    type="button"
                    className="btn btn-danger shadow-none"
                  >
                    Show More +
                  </button>
                </div>
              )}
        </div>
      </div>
    );
  };
  
  export default SearchList;
    