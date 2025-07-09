import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import AddAddress from '../Components/Add Address/AddAddress'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import Footer from '../Components/Footer/Footer';

function Address() {
  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <div>
      <Navbar/>
      <AddAddress/>
      <BottomBar/>
      <Footer/>

    </div>
  )
}

export default Address
