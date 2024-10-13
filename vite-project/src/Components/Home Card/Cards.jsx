import React from 'react' 
import './Cards.css'
import './Responsive.css'
import { useNavigate } from 'react-router-dom'

function Cards() {
  const navigate=useNavigate()
  return (
    <div>
      <div className='card-container'>
      <div className="d-flex p-2 justify-content-center">
        <div>
        <h5 className='san-font'>Featured Products </h5>
        
        
        </div>
      </div>
        <div className="d-flex flex-wrap parent-card" >
            <div onClick={()=>navigate('category', { replace: true })} className="bg-light card-div " >
              <div className="card-image" style={{backgroundImage:`url('https://th.bing.com/th/id/OIP.6W-9mzgonvS89fxS0MoFZwHaJo?w=195&h=254&c=7&r=0&o=5&dpr=1.5&pid=1.7')`}}>
                <div className='card-heart'>
                  <i class="fa-regular fa-heart heart "></i>
                </div>
              </div>
              <div className="card-info">
                <p> 
                  <span><strong>Shirt</strong></span> <br />
                  <span className='category-card'>Men</span> <br />
                  <span style={{fontFamily:'fantasy'}} className='d-flex justify-content-between'>
                    <strong>₹ 9000</strong>
                    <i class="fa-solid fa-cart-plus addToCart-card"></i>
                  </span><br />
                </p>
              </div>
            </div>
            
            <div className="bg-light card-div " >
              <div className="card-image" style={{backgroundImage:`url('https://th.bing.com/th/id/OIP.FKJpDoSUzkxBma5TcEyLQAAAAA?w=313&h=199&c=7&r=0&o=5&dpr=1.5&pid=1.7')`}}>
                <div className='card-heart'>
                  <i class="fa-regular fa-heart heart "></i>
                </div>
              </div>
              <div className="card-info">
                <p> 
                  <span><strong>Shirt</strong></span> <br />
                  <span className='category-card'>Men</span> <br />
                  <span style={{fontFamily:'fantasy'}} className='d-flex justify-content-between'>
                    <strong>₹ 9000</strong>
                    <i class="fa-solid fa-cart-plus addToCart-card"></i>
                  </span><br />
                </p>
              </div>
            </div>

            <div className="bg-light card-div " >
              <div className="card-image" style={{backgroundImage:`url('https://th.bing.com/th/id/OIP.5jmUTyBlf0OLC6SqA6VJ8gHaEK?w=260&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7')`}}>
                <div className='card-heart'>
                  <i class="fa-regular fa-heart heart "></i>
                </div>
              </div>
              <div className="card-info">
                <p> 
                  <span><strong>Shirt</strong></span> <br />
                  <span className='category-card'>Men</span> <br />
                  <span style={{fontFamily:'fantasy'}} className='d-flex justify-content-between'>
                    <strong>₹ 9000</strong>
                    <i class="fa-solid fa-cart-plus addToCart-card"></i>
                  </span><br />
                </p>
              </div>
            </div>

            <div className="bg-light card-div " >
              <div className="card-image" style={{backgroundImage:`url('https://th.bing.com/th/id/OIP.xn3FGON4cCx5sDeyPS3S-QHaKe?w=195&h=276&c=7&r=0&o=5&dpr=1.5&pid=1.7')`}}>
                <div className='card-heart'>
                  <i class="fa-regular fa-heart heart "></i>
                </div>
              </div>
              <div className="card-info">
                <p> 
                  <span><strong>Shirt</strong></span> <br />
                  <span className='category-card'>Men</span> <br />
                  <span style={{fontFamily:'fantasy'}} className='d-flex justify-content-between'>
                    <strong>₹ 9000</strong>
                    <i class="fa-solid fa-cart-plus addToCart-card"></i>
                  </span><br />
                </p>
              </div>
            </div>

            <div className="bg-light card-div " >
              <div className="card-image" style={{backgroundImage:`url('https://th.bing.com/th/id/OIP.6W-9mzgonvS89fxS0MoFZwHaJo?w=195&h=254&c=7&r=0&o=5&dpr=1.5&pid=1.7')`}}>
                <div className='card-heart'>
                  <i class="fa-regular fa-heart heart "></i>
                </div>
              </div>
              <div className="card-info">
                <p> 
                  <span><strong>Shirt</strong></span> <br />
                  <span className='category-card'>Men</span> <br />
                  <span style={{fontFamily:'fantasy'}} className='d-flex justify-content-between'>
                    <strong>₹ 9000</strong>
                    <i class="fa-solid fa-cart-plus addToCart-card"></i>
                  </span><br />
                </p>
              </div>
            </div>

            <div className="bg-light card-div " >
              <div className="card-image" style={{backgroundImage:`url('https://th.bing.com/th/id/OIP.FKJpDoSUzkxBma5TcEyLQAAAAA?w=313&h=199&c=7&r=0&o=5&dpr=1.5&pid=1.7')`}}>
                <div className='card-heart'>
                  <i class="fa-regular fa-heart heart "></i>
                </div>
              </div>
              <div className="card-info">
                <p> 
                  <span><strong>Shirt</strong></span> <br />
                  <span className='category-card'>Men</span> <br />
                  <span style={{fontFamily:'fantasy'}} className='d-flex justify-content-between'>
                    <strong>₹ 9000</strong>
                    <i class="fa-solid fa-cart-plus addToCart-card"></i>
                  </span><br />
                </p>
              </div>
            </div>

            <div className="bg-light card-div " >
              <div className="card-image" style={{backgroundImage:`url('https://th.bing.com/th/id/OIP.5jmUTyBlf0OLC6SqA6VJ8gHaEK?w=260&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7')`}}>
                <div className='card-heart'>
                  <i class="fa-regular fa-heart heart "></i>
                </div>
              </div>
              <div className="card-info">
                <p> 
                  <span><strong>Shirt</strong></span> <br />
                  <span className='category-card'>Men</span> <br />
                  <span style={{fontFamily:'fantasy'}} className='d-flex justify-content-between'>
                    <strong>₹ 9000</strong>
                    <i class="fa-solid fa-cart-plus addToCart-card"></i>
                  </span><br />
                </p>
              </div>
            </div>

            <div className="bg-light card-div " >
              <div className="card-image" style={{backgroundImage:`url('https://th.bing.com/th/id/OIP.xn3FGON4cCx5sDeyPS3S-QHaKe?w=195&h=276&c=7&r=0&o=5&dpr=1.5&pid=1.7')`}}>
                <div className='card-heart'>
                  <i class="fa-regular fa-heart heart "></i>
                </div>
              </div>
              <div className="card-info">
                <p> 
                  <span><strong>Shirt</strong></span> <br />
                  <span className='category-card'>Men</span> <br />
                  <span style={{fontFamily:'fantasy'}} className='d-flex justify-content-between'>
                    <strong>₹ 9000</strong>
                    <i class="fa-solid fa-cart-plus addToCart-card"></i>
                  </span><br />
                </p>
              </div>
            </div>

            <div className="bg-light card-div " >
              <div className="card-image" style={{backgroundImage:`url('https://th.bing.com/th/id/OIF.DTsgSHqWcgv83WJEWDDZYA?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7')`}}>
                <div className='card-heart'>
                  <i class="fa-regular fa-heart heart "></i>
                </div>
              </div>
              <div className="card-info">
                <p> 
                  <span><strong>Shirt</strong></span> <br />
                  <span className='category-card'>Men</span> <br />
                  <span style={{fontFamily:'fantasy'}} className='d-flex justify-content-between'>
                    <strong>₹ 9000</strong>
                    <i class="fa-solid fa-cart-plus addToCart-card"></i>
                  </span><br />
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cards
