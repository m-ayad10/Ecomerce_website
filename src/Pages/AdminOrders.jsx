import React, { useEffect } from 'react'
import AdminNavbar from '../Components/Admin Navbar/AdminNavbar'
import AllOrders from '../Components/Admin Orders/AllOrders'
import Footer from '../Components/Footer/Footer';

function AdminOrders() {
  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <div>
      <AdminNavbar/>
      <AllOrders/>
      <Footer/>

    </div>
  )
}

export default AdminOrders
