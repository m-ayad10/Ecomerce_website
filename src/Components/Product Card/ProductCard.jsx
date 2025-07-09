import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../Firebase/config';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

function ProductCard({ products, title }) {
  const navigate = useNavigate();
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
    if (!userId) {
      Swal.fire('Error', 'Please log in to manage your wishlist.', 'error');
      return;
    }
  
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
  
  //onClick={() => addToCart(obj)}
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
      <div className="productCard-border">
        <div className="d-flex justify-content-center">
          <h4 className="san-font">{title}</h4>
        </div>
        <div className="card-container">
          {products.slice(0, 5).map((obj) => {
            const isWishlisted = wishlist.some(
              (item) => item.productId === obj.id
            );

            return (
              <div className="card-box bg-light" key={obj.id}>
                <div className="d-flex justify-content-center">
                  <div className="card-box-image-container">
                    <div className="card-image-box">
                      <img
                        src={obj.imageUrls[0]?.url || 'path/to/placeholder-image.jpg'}
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
                <div className="card-box-content">
                <p className='productCard-name'>{obj.name}
                </p>
                  <p className="productCard-category">{obj.category}</p>
                  <div className="d-flex justify-content-between">
                    <p className="productCard-price">
                      <strong>₹ {obj.price}</strong>
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
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
