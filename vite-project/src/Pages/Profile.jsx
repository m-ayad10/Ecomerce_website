import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import ProfileInfo from '../Components/Profile Info/ProfileInfo'

function Profile() {
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
