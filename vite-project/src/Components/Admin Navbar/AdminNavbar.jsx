import React from 'react'
function AdminNavbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><h4>Ryme.</h4></a>
    
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav m-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page"  href="#">Orders</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page"  href="#">Users </a>
        </li>
        
        
      </ul>
      
    </div>
    <div className="d-flex align-items-center nav-right ">
        <p className="mb-0 "><i className="fa-solid fa-magnifying-glass nav-icon"></i></p>
      </div>
  </div>
</nav>

    </div>
  )
}

export default AdminNavbar
