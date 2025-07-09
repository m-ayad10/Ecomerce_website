import React, { useState, useEffect } from 'react';
import './ProductView.css';
import './Responsive.css';
import Swal from 'sweetalert2';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { Navigation, FreeMode, Thumbs } from 'swiper/modules';
import { auth, db } from '../../Firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function ProductView({ product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState();


  const generateRandomId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 9); // Generates a random ID
  };

  const addToCart = async (obj) => {
    const user = auth.currentUser;
    if (!user) {
      console.log('User not authenticated');
      return; // Prevent further execution if the user is not logged in
    }

    // Check if size is selected
    if (!size) {
      Swal.fire({
        title: 'Error!',
        text: 'Size not selected',
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
      return; // Exit the function if size is not selected
    }

    // Check if imageUrls is valid and contains at least one image
    if (!obj.imageUrls || !obj.imageUrls[0] || !obj.imageUrls[0].url) {
      console.error('Product image is missing');
      return;
    }

    try {
      // Reference to the Cart collection for the current user
      const cartDocRef = doc(db, 'Users', user.uid, 'Cart', 'cart'); // 'cart' document to store cart items and total

      // Fetch the existing cart data
      const cartDocSnap = await getDoc(cartDocRef);
      let cartData = cartDocSnap.exists() ? cartDocSnap.data() : { items: [], TotalPrice: 0 };

      // Check if the product with the same ID and size exists
      let existingProductIndex = cartData.items.findIndex(item => item.productId === obj.id && item.size === size);

      if (existingProductIndex !== -1) {
        // If product exists, update the quantity and subtotal
        cartData.items[existingProductIndex].quantity += 1;
        cartData.items[existingProductIndex].subTotal = obj.price * cartData.items[existingProductIndex].quantity;
      } else {
        // If new product, add it to the cart with a generated random ID
        cartData.items.push({
          id: generateRandomId(),
          name: obj.name,
          price: obj.price,
          size: size, // Use the selected size
          productId: obj.id,
          imageUrl: obj.imageUrls[0].url, // Use the first image URL
          quantity: quantity,
          subTotal: obj.price * quantity, // Calculate subtotal for this product
        });
      }

      // Calculate the total price based on the updated cart items
      cartData.TotalPrice = cartData.items.reduce((total, item) => total + item.subTotal, 0);

      // Update or set the Cart document
      await setDoc(cartDocRef, cartData);

      console.log('Product added/updated in cart and TotalPrice updated');
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
      <div className="catergory-container row">
        {/* Image Section */}
        <div className="col-xl-5 col-lg-4 col-md-4 col-sm-5 col-12-img">
          <div className="cate-image-cont d-flex justify-content-center">
            <div className="img-cont">
              <div className="cate-image-box">
                {product.imageUrls?.length > 0 && (
                  <Swiper
                    style={{
                      '--swiper-navigation-color': '#fff',
                      '--swiper-pagination-color': '#fff',
                      '--swiper-navigation-size': '15px',
                    }}
                    slidesPerView={1}
                    spaceBetween={10}
                    grabCursor
                    
                    loop
                    navigation={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                    className="mySwiper2"
                  >
                    {product.imageUrls.map((img, index) => (
                      <SwiperSlide key={index} className="d-flex justify-content-center">
                        <img src={img.url} className="cate-image" alt={`Slide ${index}`} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>

              {/* Thumbnail Selector */}
              <div className="img-selec-cont">
                {product.imageUrls?.length > 0 && (
                  <Swiper
                    style={{
                      '--swiper-navigation-size': '15px',
                    }}
                    watchSlidesProgress={true}
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={3}
                    freeMode={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    {product.imageUrls.map((img, index) => (
                      <SwiperSlide key={index} className="swiper-slide-1 d-flex justify-content-center">
                        <img src={img.url} className="cate-image" alt={`Slide ${index}`} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="col-xl-7 col-lg-8 col-md-8 col-sm-7 col-12-desc column-desc">
          <h6 className="name-desc">{product.name}</h6>
          <h6 className="category-card">{product.gender}</h6>
          <p className="name-desc">₹ {product.price}</p>

          {/* Size Selector */}
          <select
            id="size"
            aria-placeholder="select"
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Select size</option>
            <option value="sm">S</option>
            <option value="lg">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
          </select>

          <br />
          <div className="d-flex">
            {/* Quantity Controls */}
            <div className="m-1">
              <i
                className="fa-solid fa-minus"
                onClick={() => {
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
              ></i>
              <input
                type="number"
                disabled
                className="ms-2 quantity-desc"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <i className="fa-solid fa-plus" onClick={() => setQuantity(quantity + 1)}></i>
            </div>
            {/* Add to Cart Button */}
            <button type="button" className="button-desc ms-3 m-1" onClick={() => addToCart(product)}>
              ADD TO CART
            </button>
          </div>

          <h6 className="san-font">Product Details:</h6>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
