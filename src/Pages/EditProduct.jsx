import React, { useEffect } from 'react'
import AdminNavbar from '../Components/Admin Navbar/AdminNavbar'
import ChangeProduct from '../Components/Change Product/ChangeProduct'
import { useParams } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'

function EditProduct() {
  const {productId}=useParams()
  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <div>
      <AdminNavbar/>
      <ChangeProduct productId={productId}/>
      <Footer/>

    </div>
  )
}

export default EditProduct
