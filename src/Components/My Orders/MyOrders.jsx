import React from 'react'
import './MyOrders.css'
import './Responsive.css'
function MyOrders() {
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
                                    <p className='order-productName'>{obj.name} </p>
                                    <strong><i class="fa-solid fa-indian-rupee-sign addProduct-box-icon"></i> {obj.price}</strong>
                                    <p></p>
                                    <div className='details-s-q'>
                                        <p className=''>Size: {obj.size}</p>
                                        <p>Qty: {obj.quantity}</p>
                                    </div>
                                    <div className='details-status-date'>
                                        <div className="order-status">
                                            <p>status: <span className='text-danger '>{obj.status}</span></p>
                                        </div>
                                        <div className="order-delivery">
                                            <p>Delivery Expected by : <span className='order-delivery-date'>{obj.date}</span></p>
                                        </div>
                                    </div>  
                                    <div className='deliveryDetails'>
                                        <p><strong>Delivery Address: </strong> {obj.address}
                                        </p>
                                    </div>
                                    <a href="" className='text-danger details-cancel'>Cancel Order</a>
            
                                </div>
            
                                <div className="order-delivery-status">
                                    <div className=''>
                                        <div className="order-status">
                                            <p className='text-danger '>{obj.status}</p>
                                        </div>
                                        <div className="order-delivery">
                                            <p>Delivery Expected by</p>
                                           <p className='order-delivery-date'>{obj.date}</p>
                                        </div>
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
                        <div className='details-status-date'>
                            <div className="order-status">
                                <p>status: <span className='text-danger '>Pending</span></p>
                            </div>
                            <div className="order-delivery">
                                <p>Delivery Expected by : <span className='order-delivery-date'>23-04-2004</span></p>
                            </div>
                        </div>  
                        <div className='deliveryDetails'>
                            <p><strong>Delivery Address: </strong> Mohammed Ayad,zahara cottege,Near Mohd Haji Bus Stand Sonkal,po.Uppala 671322,Kasargod
                            </p>
                        </div>
                        <a href="" className='text-danger details-cancel'>Cancel Order</a>

                    </div>

                    <div className="order-delivery-status">
                        <div className=''>
                            <div className="order-status">
                                <p className='text-danger '>Pending</p>
                            </div>
                            <div className="order-delivery">
                                <p>Delivery Expected by</p>
                               <p className='order-delivery-date'>23-04-2004</p>
                            </div>
                        </div>   
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

export default MyOrders
