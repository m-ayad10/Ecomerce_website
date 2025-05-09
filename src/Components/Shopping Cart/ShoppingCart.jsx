import React, { useEffect, useState } from 'react';
import { db, auth } from '../../Firebase/config'; // Adjust the path as necessary
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import './ShoppingCart.css';
import './Responsive.css';

import { useNavigate } from 'react-router-dom';


function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Function to fetch cart data
  const fetchCartData = async (user) => {
    if (!user) {
      console.log('User not authenticated');
      return;
    }

    try {
      const cartDocRef = doc(db, 'Users', user.uid, 'Cart', 'cart');
      const cartDocSnap = await getDoc(cartDocRef);

      if (cartDocSnap.exists()) {
        const cartData = cartDocSnap.data();
        setProducts(cartData.items);
        setTotalPrice(cartData.TotalPrice);
      } else {
        console.log('No cart data found for this user.');
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  // Listen to user authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchCartData(user);
      } else {
        console.log('User not authenticated');
      }
    });

    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  const deleteProduct = async (productId) => {
    const user = auth.currentUser;
    if (!user) {
      console.log('User not authenticated');
      return;
    }

    try {
      const cartDocRef = doc(db, 'Users', user.uid, 'Cart', 'cart');
      const cartDocSnap = await getDoc(cartDocRef);
      if (!cartDocSnap.exists()) {
        console.log('Cart document does not exist');
        return;
      }

      let cartData = cartDocSnap.data();

      // Filter out the product with the given productId
      const updatedItems = cartData.items.filter(item => item.productId !== productId);
      cartData.items = updatedItems;

      // Recalculate total price based on the updated items
      cartData.TotalPrice = updatedItems.reduce((total, item) => total + item.subTotal, 0);

      // Update the Cart document in Firestore
      await setDoc(cartDocRef, cartData);

      // Update the local state
      setProducts(updatedItems);
      setTotalPrice(cartData.TotalPrice);
      Swal.fire({
        title: 'Success!',
        text: 'Removed from Cart',
        icon: 'success',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
      console.log('Product removed from cart successfully');
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const updateSize = async (productId, newSize) => {
    const user = auth.currentUser;
    if (!user) {
      console.log('User not authenticated');
      return;
    }

    try {
      const cartDocRef = doc(db, 'Users', user.uid, 'Cart', 'cart');
      const cartDocSnap = await getDoc(cartDocRef);
      if (!cartDocSnap.exists()) {
        console.log('Cart document does not exist');
        return;
      }

      let cartData = cartDocSnap.data();
      const updatedItems = cartData.items.map(item =>
        item.productId === productId ? { ...item, size: newSize } : item
      );

      cartData.items = updatedItems;

      // Update the Cart document in Firestore
      await setDoc(cartDocRef, cartData);

      // Update local state
      setProducts(updatedItems);
      console.log('Product size updated successfully');
    } catch (error) {
      console.error('Error updating product size:', error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    const user = auth.currentUser;
    if (!user) {
      console.log('User not authenticated');
      return;
    }

    try {
      const cartDocRef = doc(db, 'Users', user.uid, 'Cart', 'cart');
      const cartDocSnap = await getDoc(cartDocRef);
      if (!cartDocSnap.exists()) {
        console.log('Cart document does not exist');
        return;
      }

      let cartData = cartDocSnap.data();
      const updatedItems = cartData.items.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity, subTotal: item.price * newQuantity } : item
      );

      cartData.items = updatedItems;
      cartData.TotalPrice = updatedItems.reduce((total, item) => total + item.subTotal, 0);

      // Update the Cart document in Firestore
      await setDoc(cartDocRef, cartData);

      // Update local state
      setProducts(updatedItems);
      setTotalPrice(cartData.TotalPrice);
      console.log('Product quantity updated successfully');
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  return (
    <div>
      <div className="cart-border">
        <h3 className='cart-heading'>Shopping Cart</h3>
        <hr className='cart-border-hr' />
        <div className='cart-cate-name'>
          <p className='cart-product-head-prod ps-3'>product</p>
          <p className='cart-product-head-quan'>quantity</p>
          <p className='cart-product-head-tot'>sub total</p>
        </div>
        <hr className='cart-border-hr' />
        <div className="cart-product-container">
          {products.length > 0 ? (
            products.map((obj) => (
              <div key={obj.productId}>
                <div className='cart-product'>
                  <div className="cart-product-details">
                    <div className="cart-product-image">
                      <img src={obj.imageUrl} alt={obj.name} />
                    </div>
                    <div className="cart-product-content">
                      <div>
                        <p className='cart-content-name'>{obj.name}</p>
                        <p className='cart-content-font'>
                          <i className="fa-solid fa-indian-rupee-sign addProduct-box-icon"></i>
                          {obj.price}
                        </p>
                        <select
                          className='cursor-p'
                          id="size"
                          defaultValue={obj.size}
                          onChange={(e) => updateSize(obj.productId, e.target.value)}
                        >
                          <option value="sm">sm</option>
                          <option value="lg">lg</option>
                          <option value="xl">xl</option>
                          <option value="xxl">xxl</option>
                        </select>
                        <p className='cart-content-font text-danger cursor-p' onClick={() => deleteProduct(obj.productId)}>Remove</p>
                      </div>
                    </div>
                  </div>
                  <div className="cart-product-quantity">
                    <div className='m-1'>
                      <i
                        className="fa-solid fa-minus cursor-p"
                        onClick={() => {
                          if (obj.quantity > 1) {
                            updateQuantity(obj.productId, obj.quantity - 1);
                          }
                        }}
                      ></i>
                      <input
                        type="number"
                        disabled
                        className='ms-2 quantity-desc'
                        value={obj.quantity}
                      />
                      <i
                        className="fa-solid fa-plus cursor-p"
                        onClick={() => {
                          updateQuantity(obj.productId, obj.quantity + 1);
                        }}
                      ></i>
                    </div>
                  </div>
                  <div className="cart-product-subtotal">
                    <p>{obj.price * obj.quantity}</p>
                  </div>
                  <div className='cart-product-break'>
                    <hr className='cart-product-hr' />
                  </div>
                </div>
                <div className='cart-product-break'>
                  <hr className='cart-product-hr' />
                </div>
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
              <p className="mb-0 text-muted">No products in cart</p>
            </div>

          )}

        </div>
        <div className='d-flex justify-content-between me-3'>
          <button type="button" className="btn btn-dark san-font shadow-none" onClick={()=>navigate('/')}>Continue Shopping</button>
          <h5 className='san-font'>Total Price: {totalPrice}</h5>
        </div>
        {
          products.length>0?(
            <div className='d-flex justify-content-end me-3'>
            <button type="button" className="btn btn-dark san-font shadow-none" onClick={() => navigate('/checkout')}>Proceed to Pay</button>
          </div>
          ):
          (
            <div className='d-flex justify-content-end me-3'>
            <button type="button" className="btn btn-dark san-font shadow-none" onClick={() =>{
              
              Swal.fire({
                title: 'Warning!',
                text: 'Add products to the cart',
                icon: 'warning', // Use the warning icon
                confirmButtonText: 'Ok',
                customClass: {
                  popup: 'custom-swal-popup',
                },
              }).then(() => {
                navigate('/');
              });}}>Proceed to Pay</button>
          </div>
          )
        }
       
      </div>
    </div>
  );
}

export default ShoppingCart;
