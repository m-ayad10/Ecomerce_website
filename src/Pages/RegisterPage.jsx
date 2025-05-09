import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import CreateAccount from '../Components/Create Account/CreateAccount'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import Footer from '../Components/Footer/Footer';

function RegisterPage() {
  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <div>
      <Navbar/>
      <CreateAccount/>
      <BottomBar/>
      <Footer/>

    </div>
  )
}

export default RegisterPage
