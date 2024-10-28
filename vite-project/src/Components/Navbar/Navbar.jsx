import React, { useState } from 'react'
import './Navbar.css'
import {useNavigate} from 'react-router-dom'
function Navbar() {
  const navigate=useNavigate()
  const [search,setSearch]=useState(false)
  
  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href=""><h4>Ryme.</h4></a>
    
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav m-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <p class="nav-link active cursor-p san-font" aria-current="page"  onClick={()=>navigate('/')}>Home</p>
        </li>
        <li class="nav-item">
          <p class="nav-link active cursor-p san-font" aria-current="page"  href="">Men</p>
        </li>
        <li class="nav-item">
          <p class="nav-link active cursor-p san-font" aria-current="page"  href="">Women </p>
        </li>
        <li class="nav-item">
          <p class="nav-link active cursor-p san-font" aria-current="page"  href="">Contact</p>
        </li>
        
      </ul>
      
    </div>
    <div className="d-flex align-items-center nav-right ">
        <p className="mb-0 navbar-hide cursor-p" onClick={()=>navigate('/wishlist')} ><i class="fa-solid fa-heart nav-icon"></i></p>
        <p className="mb-0 cursor-p " onClick={()=>setSearch(search!=true)}><i className="fa-solid fa-magnifying-glass nav-icon"></i></p>
        <p className="mb-0 cursor-p" onClick={()=>navigate('/cart')}><i class="fa-solid fa-cart-shopping nav-icon"></i></p>
        <p className="mb-0 navbar-hide " onClick={()=>navigate('/login')}><button type='button' className='btn nav-login-btn bg-primary text-light'>Login</button></p>
        <p className="mb-0  ">
        <ul class="navbar-nav ms-auto navbar-hide">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle d-flex align-items-center"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div className='loged-initial'><p>MA</p></div>
        </a>
        <ul class="dropdown-menu dropdown-menu-loged" aria-labelledby="navbarDropdownMenuLink">
          <li><a class="dropdown-item" href="#" onClick={()=>navigate('/profile')}><i class="fa-solid fa-user"></i>  My profile</a></li>
          <li><a class="dropdown-item" href="#" onClick={()=>navigate('/orders')}><i class="fa-solid fa-bag-shopping"></i> Orders</a></li>
          <li><a class="dropdown-item" href="#"><i class="fa-solid fa-right-from-bracket"></i>  Logout</a></li>
        </ul>
      </li>
    </ul>
        </p>


      </div>
  </div>
</nav>
{search?(
  <div className="search-form-container">
  <div className="search-form-box">
    <div className="input-container">
      <input
        type="search"
        className="head-search-form"
        placeholder="Search"
      />
    </div>
    <div className="icon-container d-flex align-items-center">
      <i className="fa-solid fa-xmark" onClick={()=>setSearch(false)}></i>
    </div>
  </div>
</div>

):''}



    </div>
  )
}

export default Navbar
