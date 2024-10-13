import React from 'react'
import './Footer.css'
import './Responsive.css'
import { useLocation, useNavigate } from 'react-router-dom'


function BottomBar() {
  const navigate=useNavigate()
  const location=useLocation()
  return (
    <div>
      <div className='hieght'>

      </div>
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
        <i class="fa-solid fa-store footer-icon white"></i>
          <p className='footer-text' style={{ color: 'white' }}>shop</p>
        </>
      ) : (
        <>
          <i class="fa-solid fa-store footer-icon "></i>
          <p className='footer-text' >shop</p>
        </>
      )
    }
  </div>

  <div className="footer-column" onClick={() => navigate('/movies')}>
    {
      location.pathname === '/movies' ? (
        <>
          <i className="fa-solid fa-clapperboard footer-icon white"></i>
          <p className='footer-text' style={{ color: 'white' }}>Movies</p>
        </>
      ) : (
        <>
        <i class="fa-solid fa-user footer-icon"></i>
          <p className='footer-text'>account</p>
        </>
      )
    }
  </div>

  <div className="footer-column" onClick={() => navigate('/tv-shows')}>
    {
      location.pathname === '/tv-shows' ? (
        <>
          <i className="fa-solid fa-tv footer-icon white"></i>
          <p className='footer-text' style={{ color: 'white' }}>Tv Shows</p>
        </>
      ) : (
        <>
        <i class="fa-solid fa-heart footer-icon"></i>
          <p className='footer-text'>favourite</p>
        </>
      )
    }
  </div>

  <div className="footer-column" onClick={() => navigate('/news')}>
    {
      location.pathname === '/news' ? (
        <>
          <i className="fa-solid fa-newspaper footer-icon white"></i>
          <p className='footer-text' style={{ color: 'white' }}>News & Pop</p>
        </>
      ) : (
        <>
          <i className="fa-solid fa-newspaper footer-icon"></i>
          <p className='footer-text'>News & Pop</p>
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
