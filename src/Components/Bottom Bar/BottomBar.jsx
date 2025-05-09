import React from 'react'
import './Footer.css'
import './Responsive.css'
import { useLocation, useNavigate } from 'react-router-dom'


function BottomBar() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div>

      <footer className='bg-light bottom-footer'>
        <div className="footer-row">
          <div className="footer-column" onClick={() => navigate('/')}>
            {
              location.pathname === '/' ? (
                <>
                  <i className="fa-solid fa-house footer-icon white"></i>
                  <p className='footer-text' >Home</p>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-house footer-icon"></i>
                  <p className='footer-text'>Home</p>
                </>
              )
            }
          </div>

          <div className="footer-column" onClick={() => navigate('/search')}>
            {
              location.pathname === '/search' ? (
                <>
                  <i class="fa-solid fa-magnifying-glass footer-icon"></i>
                  <p className='footer-text' >Search</p>
                </>
              ) : (
                <>
                  <i class="fa-solid fa-magnifying-glass footer-icon"></i>
                  <p className='footer-text' >Search</p>
                </>
              )
            }
          </div>



          <div className="footer-column" onClick={() => navigate('/wishlist')}>
            {
              location.pathname === '/tv-shows' ? (
                <>
                  <i class="fa-solid fa-heart footer-icon"></i>
                  <p className='footer-text'>favourite</p>
                </>
              ) : (
                <>
                  <i class="fa-solid fa-heart footer-icon"></i>
                  <p className='footer-text'>favourite</p>
                </>
              )
            }
          </div>

          <div className="footer-column" onClick={() => navigate('/orders')}>
            {
              location.pathname === '/orders' ? (
                <>
                  <i className="fa-solid fa-bag-shopping footer-icon"></i>
                  <p className='footer-text'>Orders</p>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-bag-shopping footer-icon"></i>
                  <p className='footer-text'>Orders</p>
                </>
              )
            }
          </div>

          <div className="footer-column" onClick={() => navigate('/profile')}>
            {
              location.pathname === '/news' ? (
                <>
                  <i class="fa-solid fa-user"></i>
                  <p className='footer-text' style={{ color: 'white' }}>Account</p>
                </>
              ) : (
                <>
                  <i class="fa-solid fa-user"></i>
                  <p className='footer-text'>Account</p>
                </>
              )
            }
          </div>
        </div>

      </footer>
    </div>
  )
}

export default BottomBar
