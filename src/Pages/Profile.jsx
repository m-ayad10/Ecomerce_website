import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import ProfileInfo from '../Components/Profile Info/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Firebase/config'
import Swal from 'sweetalert2'

function Profile() {
  const [userId, setUserId] = useState(null); // Initial state is null
    const navigate=useNavigate()
    useEffect(() => {
      // 👇️ Scroll to top on page load
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid); // Set user ID if user is logged in
        } else {
          setUserId(null); // Clear user ID if no user is logged in
          Swal.fire({
                  title: 'error',
                  text: 'Login to view Profile',
                  icon: 'error',
                  confirmButtonText: 'Login',
                  customClass: {
                    popup: 'custom-swal-popup',
                  },
                }).then(()=>
                {
                  navigate('/login')
                })
        }
      });
  
      // Cleanup subscription on component unmount
      return () => unsubscribe();
    }, []);
  return (
    <div>
      <Navbar/>
      <ProfileInfo/>
      <Footer/>
      <BottomBar/>
    </div>
  )
}

export default Profile
