import React from 'react'
import './AllOrders.css'
function AllOrders() {
    const product=[
        {
            name:'WES Casuals Grey Melange Cotton Slim Fit T-Shirt',
            image:'https://www.westside.com/cdn/shop/files/300990200BLUE_1.jpg?v=1727940909&width=493',
            price:2000,
            status:'Pending',
            date:'23-062024',
            quantity:1,
            size:'sm',
            orderId:'ABC-6457325',
            address:'Mohammed Ayad,zahara cottege,Near Mohd Haji Bus Stand Sonkal,po.Uppala 671322,Kasargod'
        },
        {
            name:'WES Casuals Grey Melange Cotton Slim Fit T-Shirt',
            image:'https://www.westside.com/cdn/shop/files/300990200BLUE_1.jpg?v=1727940909&width=493',
            price:2000,
            quantity:1,
            status:'Pending',
            date:'23-062024',
            size:'sm',
            orderId:'ABC-6457325',
            address:'Mohammed Ayad,zahara cottege,Near Mohd Haji Bus Stand Sonkal,po.Uppala 671322,Kasargod'
        },
        {
            name:'WES Casuals Grey Melange Cotton Slim Fit T-Shirt',
            image:'https://www.westside.com/cdn/shop/files/300990200BLUE_1.jpg?v=1727940909&width=493',
            price:2000,
            quantity:1,
            status:'Pending',
            date:'23-062024',
            size:'sm',
            orderId:'ABC-6457325',
            address:'Mohammed Ayad,zahara cottege,Near Mohd Haji Bus Stand Sonkal,po.Uppala 671322,Kasargod'
        },
        {
            name:'WES Casuals Grey Melange Cotton Slim Fit T-Shirt',
            image:'https://www.westside.com/cdn/shop/files/300990200BLUE_1.jpg?v=1727940909&width=493',
            price:2000,
            status:'Pending',
            date:'23-062024',
            quantity:1,
            size:'sm',
            orderId:'ABC-6457325',
            address:'Mohammed Ayad,zahara cottege,Near Mohd Haji Bus Stand Sonkal,po.Uppala 671322,Kasargod'
        },
        {
            name:'WES Casuals Grey Melange Cotton Slim Fit T-Shirt',
            image:'https://www.westside.com/cdn/shop/files/300990200BLUE_1.jpg?v=1727940909&width=493',
            price:2000,
            status:'Pending',
            date:'23-062024',
            quantity:1,
            size:'sm',
            orderId:'ABC-6457325',
            address:'Mohammed Ayad,zahara cottege,Near Mohd Haji Bus Stand Sonkal,po.Uppala 671322,Kasargod'
        },
    ]
  return (
    <div>
      <div className="myOrder-border">
        <h2 className='order-heading'>My Orders</h2>
        <hr className="order-border-hr"  />
        <div className="myOrder-container">
            {
                product.map((obj)=>
                {
                    return(
                        <div>
                        <div className="myOrder-box">
                            <div className="order-product">
                                <div className="order-image-box">
                                    <img src={obj.image} alt="" className='order-image' />
                                </div>
                                <div className='order-product-details '>
                                <div className=" ">
                                    <p className="order-orderId text-danger">Order Id: {obj.orderId} </p>
                                    <p className='order-ids'><strong>User ID:</strong> ABC65788</p>
                                    <p className='order-ids'><strong>Product ID:</strong> ABC668GH</p>
                                    <p className='order-productName'>{obj.name} </p>
                                    <strong><i class="fa-solid fa-indian-rupee-sign addProduct-box-icon"></i> {obj.price}</strong>
                                    <p></p>
                                    <div className='details-s-q'>
                                        <p className=''>Size: {obj.size}</p>
                                        <p>Qty: {obj.quantity}</p>
                                    </div>
                                    <div>
                                    <div className='d-flex'>
                            <label htmlFor="">Ordered Date:</label>
                            <p className='ms-2'>23-06-2024</p>
                        </div> 
                            <div>
                                <label htmlFor="">Delivery Status:</label>
                            <select 
                    className=" ms-2" 
                    aria-label="Select Status"
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Out-of-Delivery">Out of Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                            </div>
                            <div>
                                <label htmlFor="">Delivery Expected by :</label>
                                <input type="date" id="dateInput" class="dateInput" placeholder="Date:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MMYYYY" />                            </div>
                        </div>
                                    
                                    <div className='deliveryDetails'>
                                        <p><strong>Delivery Address: </strong> {obj.address}
                                        </p>
                                    </div>
            
                                </div>
                                </div>
                                
                                
            
                            </div>
                            
                        </div>
                        
                        <hr className="w-100" />
                        </div>
                    )
                })
            }
            <div>
            <div className="myOrder-box">
                <div className="order-product">
                    <div className="order-image-box">
                        <img src="https://www.westside.com/cdn/shop/products/100001_300866680_035_2.jpg?v=1700645295&width=493" alt="" className='order-image' />
                    </div>
                    <div className='order-product-details '>
                    <div className=" ">
                        <p className="order-orderId text-danger">Order Id: ABC-6457325</p>
                        <p className='order-productName'>WES Casuals Grey Melange Cotton Slim Fit T-Shirt</p>
                        <strong><i class="fa-solid fa-indian-rupee-sign addProduct-box-icon"></i> 9000</strong>
                        <p></p>
                        <div className='details-s-q'>
                            <p className=''>Size: sm</p>
                            <p>Qty: 2</p>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="">Delivery Status:</label>
                            <select 
                    className=" ms-2" 
                    aria-label="Select Status"
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Out-of-Delivery">Out of Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                            </div>
                            <div>
                                <label htmlFor="">Delivery Expected by :</label>
                                <input type="date" className='ms-2' />
                            </div>
                        </div>
                         
                        <div className='deliveryDetails'>
                            <p><strong>Delivery Address: </strong> Mohammed Ayad,zahara cottege,Near Mohd Haji Bus Stand Sonkal,po.Uppala 671322,Kasargod
                            </p>
                        </div>
                        <a href="" className='text-danger details-cancel'>Cancel Order</a>

                    </div>

                    </div>
                    
                    

                </div>
                
            </div>
            
            <hr className="w-100" />
            </div>
            

        </div>
      </div>
    </div>
  )
}

export default AllOrders
