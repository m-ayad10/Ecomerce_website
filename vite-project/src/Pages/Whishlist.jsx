import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Card from '../Components/Card/Card'
import Footer from '../Components/Footer/Footer'
import BottomBar from '../Components/Bottom Bar/BottomBar'

function Whishlist() {
  return (
    <div>
      <Navbar/>
      <Card title={'Wishlist'}/>
      <Footer/>
      <BottomBar/>
    </div>
  )
}

export default Whishlist
