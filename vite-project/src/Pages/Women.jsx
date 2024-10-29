import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import WomenBanner from '../Components/Banner/WomenBanner'
import LoadCard from '../Components/Load Card/LoadCard'

function Women() {
  return (
    <div>
      <Navbar/>
      <WomenBanner/>
      <LoadCard title={'Shirts'} />
      <LoadCard title={'Pants'} />
      <LoadCard title={'T-Shirt'} />
      <Footer/>
      <BottomBar/>
    </div>
  )
}

export default Women
