import React from 'react'
import './Navbar.css'
import {useNavigate} from 'react-router-dom'
function Navbar() {
  const navigate=useNavigate()
  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><h4>Ryme.</h4></a>
    
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav m-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href='' onClick={()=>navigate('/')}>Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page"  href="">Shop</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page"  href="">Favourite </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page"  href="">Contact</a>
        </li>
        
      </ul>
      
    </div>
    <div className="d-flex align-items-center nav-right ">
        <p className="mb-0"><i class="fa-solid fa-heart nav-icon"></i></p>
        <p className="mb-0 "><i className="fa-solid fa-magnifying-glass nav-icon"></i></p>
        <p className="mb-0" onClick={()=>navigate('cart')}><i class="fa-solid fa-cart-shopping nav-icon"></i></p>
        <p className="mb-0  " onClick={()=>navigate('login', { replace: true })}><button type='button' className='btn nav-login-btn bg-primary text-light'>Login</button></p>

      </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar
