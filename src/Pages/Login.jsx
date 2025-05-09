import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import SignIn from '../Components/SignIn/SignIn'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import Footer from '../Components/Footer/Footer';

function Login() {
  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <div>
      <Navbar/>
      <SignIn/>
      <BottomBar/>
      <Footer/>

    </div>
  )
}

export default Login
