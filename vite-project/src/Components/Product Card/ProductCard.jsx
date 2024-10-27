import React from 'react'
import './ProductCard.css'
import './Responsive.css'
import { useNavigate } from 'react-router-dom'

function ProductCard() {
    const navigate=useNavigate()
  return (
    <div className='productCard-border' >
      <div className='productCard-headin d-flex justify-content-center'>
        <h4 className='san-font'>Products </h4>
      </div>
      <div className='productCard-container d-flex justify-content-center'>
        <div className='productCard-container'>
            <div className="productCard-box bg-light" onClick={()=>navigate('/category')}>
                <div className='productCard-image-container'>
                    <img src="https://www.westside.com/cdn/shop/files/300988900DKSAGE_1.jpg?v=1727357554&width=493" className='productCard-image' alt="" />
                    

                </div>
                <div className='productCard-details'>
                    <p><strong>Shirt</strong></p>
                    <p className="productCard-category">Men</p>
                    <div className='d-flex justify-content-between'>
                        <p className='productCard-price'><strong>₹ 9000</strong></p>
                        <i class="fa-solid fa-cart-plus productCard-cart"></i>
                    </div>
                </div>
            </div>
            <div className="productCard-box bg-light">
                <div className='productCard-image-container'>
                    <img src="https://www.westside.com/cdn/shop/files/300988900DKSAGE_1.jpg?v=1727357554&width=493" className='productCard-image' alt="" />
                </div>
                <div className='productCard-details'>
                    <p><strong>Shirt</strong></p>
                    <p className="productCard-category">Men</p>
                    <div className='d-flex justify-content-between'>
                        <p className='productCard-price'><strong>₹ 9000</strong></p>
                        <i class="fa-solid fa-cart-plus productCard-cart"></i>
                    </div>
                </div>
            </div>
            <div className="productCard-box bg-light">
                <div className='productCard-image-container'>
                    <img src="https://www.westside.com/cdn/shop/files/300988900DKSAGE_1.jpg?v=1727357554&width=493" className='productCard-image' alt="" />
                </div>
                <div className='productCard-details'>
                    <p><strong>Shirt</strong></p>
                    <p className="productCard-category">Men</p>
                    <div className='d-flex justify-content-between'>
                        <p className='productCard-price'><strong>₹ 9000</strong></p>
                        <i class="fa-solid fa-cart-plus productCard-cart"></i>
                    </div>
                </div>
            </div>
            <div className="productCard-box bg-light">
                <div className='productCard-image-container'>
                    <img src="https://www.westside.com/cdn/shop/files/300988900DKSAGE_1.jpg?v=1727357554&width=493" className='productCard-image' alt="" />
                </div>
                <div className='productCard-details'>
                    <p><strong>Shirt</strong></p>
                    <p className="productCard-category">Men</p>
                    <div className='d-flex justify-content-between'>
                        <p className='productCard-price'><strong>₹ 9000</strong></p>
                        <i class="fa-solid fa-cart-plus productCard-cart"></i>
                    </div>
                </div>
            </div>
            <div className="productCard-box bg-light">
                <div className='productCard-image-container'>
                    <img src="https://www.westside.com/cdn/shop/files/300988900DKSAGE_1.jpg?v=1727357554&width=493" className='productCard-image' alt="" />
                </div>
                <div className='productCard-details'>
                    <p><strong>Shirt</strong></p>
                    <p className="productCard-category">Men</p>
                    <div className='d-flex justify-content-between'>
                        <p className='productCard-price'><strong>₹ 9000</strong></p>
                        <i class="fa-solid fa-cart-plus productCard-cart"></i>
                    </div>
                </div>
            </div>
            <div className="productCard-box bg-light">
                <div className='productCard-image-container'>
                    <img src="https://www.westside.com/cdn/shop/files/300988900DKSAGE_1.jpg?v=1727357554&width=493" className='productCard-image' alt="" />
                </div>
                <div className='productCard-details'>
                    <p><strong>Shirt</strong></p>
                    <p className="productCard-category">Men</p>
                    <div className='d-flex justify-content-between'>
                        <p className='productCard-price'><strong>₹ 9000</strong></p>
                        <i class="fa-solid fa-cart-plus productCard-cart"></i>
                    </div>
                </div>
            </div>
            <div className="productCard-box bg-light">
                <div className='productCard-image-container'>
                    <img src="https://www.westside.com/cdn/shop/files/300988900DKSAGE_1.jpg?v=1727357554&width=493" className='productCard-image' alt="" />
                </div>
                <div className='productCard-details'>
                    <p><strong>Shirt</strong></p>
                    <p className="productCard-category">Men</p>
                    <div className='d-flex justify-content-between'>
                        <p className='productCard-price'><strong>₹ 9000</strong></p>
                        <i class="fa-solid fa-cart-plus productCard-cart"></i>
                    </div>
                </div>
            </div>
            <div className="productCard-box bg-light">
                <div className='productCard-image-container'>
                    <img src="https://www.westside.com/cdn/shop/files/300988900DKSAGE_1.jpg?v=1727357554&width=493" className='productCard-image' alt="" />
                </div>
                <div className='productCard-details'>
                    <p><strong>Shirt</strong></p>
                    <p className="productCard-category">Men</p>
                    <div className='d-flex justify-content-between'>
                        <p className='productCard-price'><strong>₹ 9000</strong></p>
                        <i class="fa-solid fa-cart-plus productCard-cart"></i>
                    </div>
                </div>
            </div>
            <div className="productCard-box bg-light">
                <div className='productCard-image-container'>
                    <img src="https://www.westside.com/cdn/shop/files/300988900DKSAGE_1.jpg?v=1727357554&width=493" className='productCard-image' alt="" />
                </div>
                <div className='productCard-details'>
                    <p><strong>Shirt</strong></p>
                    <p className="productCard-category">Men</p>
                    <div className='d-flex justify-content-between'>
                        <p className='productCard-price'><strong>₹ 9000</strong></p>
                        <i class="fa-solid fa-cart-plus productCard-cart"></i>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
