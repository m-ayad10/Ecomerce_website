import React from 'react'
import './CheckoutPayment.css'
import { useNavigate } from 'react-router-dom'

function CheckoutPayment() {
    const navigate=useNavigate()
  return (
    <div className='checkout-border'>
      <h2 className='san-font'>CheckOut</h2>
      <div>
        
        <div className="row">
            <div className="col-lg-8 col-md-7 ">
            <div className="d-flex justify-content-between shipping-detail-cont">
            <p className='shipping-detail-name'>Shipping details</p>
            <p className='san-font text-primary cursor-p' onClick={()=>navigate('/addAddress')}><strong>+  </strong> Add new address</p>
        </div>
        <hr className="w-100 check-header-hr" />
            <div className="shipping-address-cont">
            
            <div className="shipping-address-box">
                <input type="radio" name='address' />
                <div>
                    <p> Mohammed Ayad,<br />zahara cottege,<br />Near Mohd Haji Bus Stand Sonkal,<br />po.Uppala 671322,<br />Kasargod</p>
                    <div className="d-flex">
                    <p className="san-font text-primary cursor-p"> Edit Address </p>
                    <p className="san-font ps-3 text-danger cursor-p"> Delete </p>

                    </div>
                </div>
            </div>
            <hr className="w-100 check-header-hr" />
            <div className="shipping-address-box">
                <input type="radio" name='address' />
                <div>
                    <p> Mohammed Ayad,<br />zahara cottege,<br />Near Mohd Haji Bus Stand Sonkal,<br />po.Uppala 671322,<br />Kasargod</p>
                    <div className="d-flex">
                    <p className="san-font text-primary cursor-p"> Edit Address </p>
                    <p className="san-font ps-3 text-danger cursor-p"> Delete </p>

                    </div>
                </div>
            </div>
            <hr className="w-100 check-header-hr" />
        </div>
            </div>
            <div className="col-lg-4 mt-1 col-md-5 bg-light ">
            <div>
            <p className='san-font'>Payment Details:</p>
            <input type="radio" name='payment'/>
            <label htmlFor="" className='ps-3' >Cash on Delivery</label><br />
            <input type="radio" name='payment' />
            <label htmlFor="" className='ps-3'>RazorPay</label>
        </div>
        <div>
            <br />
            <p className="order-summary ">Order Summary:</p>
            <div className="d-flex justify-content-between">
                <p className="san-font pe-5 m-0">Order Total</p>
                <p className='m-0'>8000</p>
            </div>
            <div className="d-flex justify-content-between">
                <p className="san-font pe-5 m-0">Shipping</p>
                <p className='m-0'>0.00</p>
            </div>
            <div className="d-flex justify-content-between">
                <p className="san-font  pe-5 m-0"><strong className='san-font'>Total</strong></p>
                <p className='m-0'>8000</p>
            </div>
            <button type="button" class="btn btn-dark w-100  san-font mt-2 shadow-none">Purchase Rs.80000</button>

        </div>
            </div>
        </div>
        
        
      </div>
    </div>
  )
}

export default CheckoutPayment
