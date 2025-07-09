import React, { useState, useEffect } from 'react';
import './Card.css';
import './Responsive.css';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { auth, db } from '../../Firebase/config';

function Card({ title, product }) {
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
        Swal.fire('Error', 'Failed to fetch wishlist.', 'error');
      }
    };

    fetchWishlist();
  }, [userId]);

  

  // Remove from Wishlist
  const removeFromWishlist = async (product) => {
    try {
      const userWishlistDocRef = doc(
        db,
        'Users',
        userId,
        'Wishlist',
        product.id
      );
      // Remove from Firestore
      await deleteDoc(userWishlistDocRef);
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== product.id));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
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
          (item) => item.productId === obj.productId
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
            productId: obj.productId,
            imageUrl: obj.imageUrl|| '',
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
        <div className="productCard-border pt-1 mt-0">
          <h4 className="san-font mt-0">
            {title} ({wishlist.length})
          </h4>
          <hr className="w-100 m-0" />
  
          {wishlist.length === 0 ? (
            <div className="d-flex justify-content-center p-5">
              <p>Your wishlist is empty. Start adding items!</p>
            </div>
          ) : (
            <div className="card-container">
              {wishlist.map((obj) => (
                <div className="card-box bg-light" key={obj.id}>
                  <div className="d-flex justify-content-center">
                    <div className="card-box-image-container">
                      <div className="card-image-box">
                        <img
                          src={obj.imageUrl || 'path/to/placeholder-image.jpg'}
                          className="card-box-image cursor-p"
                          alt={obj.name || 'Product Image'}
                          onClick={() => navigate(`/category/${obj.productId}`)}
                          />
                        <div className="card-icon-cont">
                          <i
                            className="cursor-p card-font-icon fa-solid fa-heart"
                            style={{ color: '#FF5A5F' }}
                            onClick={() => removeFromWishlist(obj)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div className="card-box-content">
                    <p className="productCard-name">{obj.name}</p>
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
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

export default Card;
