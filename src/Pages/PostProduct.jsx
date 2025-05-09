import React, { useEffect } from 'react'
import AdminNavbar from '../Components/Admin Navbar/AdminNavbar'
import CreateProduct from '../Components/Create Product/CreateProduct'
import Footer from '../Components/Footer/Footer';

function PostProduct() {

  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <div>
      <AdminNavbar/>
      <CreateProduct/>
      <Footer/>

    </div>
  )
}

export default PostProduct
