  import React, { useState } from 'react'
  import './ShoppingCart.css'
  import './Responsive.css'
import { useNavigate } from 'react-router-dom'

  function ShoppingCart({product}) {
    const navigate=useNavigate()
    const [quantity,setQuantity]=useState()
    return (
      <div>
        <div className="cart-border">
          <h3 className='cart-heading'>Shopping Cart</h3>
          <hr className='cart-border-hr'/>
          <div className='cart-cate-name'>
            <p className='cart-product-head-prod ps-3'>product</p>
            <p className='cart-product-head-quan'>quantity</p>
            <p className='cart-product-head-tot'>sub total</p>
          </div>
          <hr className='cart-border-hr' />
          <div className="cart-product-container">
          {
            product.map((obj)=>
            {
              return(
                <div>
                  <div className='cart-product'>
            <div className="cart-product-details ">
              <div className="cart-product-image">
                <img src={obj.image} alt="" />
              </div>
              <div className="cart-product-content ">
                <div >
                <p className='cart-content-name'>{obj.name}</p>
                <p className='cart-content-font'><i class="fa-solid fa-indian-rupee-sign addProduct-box-icon"></i>.2000</p>
                <select id="cars" defaultValue={obj.size} aria-placeholder="Select size">
    <option value="sm">sm</option>
    <option value="lg">lg</option>
    <option value="xl">xl</option>
    <option value="xxl">xxl</option>
  </select>

                <p className='cart-content-font text-danger'>Remove</p>
                </div>
                
              </div>
            </div>
            <div className="cart-product-quantity">
            <div className='m-1'>
                <i class="fa-solid fa-minus"  onClick={()=>{
                  if(quantity>1)
                  setQuantity(quantity-1)}}
                  ></i>
                    <input type="number" disabled  className='ms-2 quantity-desc' value={obj.quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                    <i class="fa-solid fa-plus" onClick={()=>setQuantity(quantity+1)}></i>
                    </div>
            </div>
            <div className="cart-product-subtotal">
              <p className=''>{obj.price}</p>
            </div>
            <div className='cart-product-break'>
              <hr className='cart-product-hr'/>
          </div>
            
          </div>
          <div className='cart-product-break'>
<hr className='cart-product-hr'/>
</div>
                </div>


              )
            })
          }
          </div>
          
          <div className='d-flex justify-content-between me-3 mt-4'>
          <button type="button" className="btn btn-dark san-font shadow-none" onClick={() => navigate('/')}>Continue Shopping</button>
          <h5 className='san-font'>Total Price: 9000</h5>
        </div>
        <div className='d-flex justify-content-end me-3'>
          <button type="button" className="btn btn-dark san-font shadow-none" onClick={() => navigate('/checkout')}>Proceed to Pay</button>
        </div>

        </div>
      </div>
    )
  }

  export default ShoppingCart
