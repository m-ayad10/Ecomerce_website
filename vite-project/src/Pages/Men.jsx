import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import Card from '../Components/Card/Card'
import ProductCard from '../Components/Product Card/ProductCard'
import MenBanner from '../Components/Banner/MenBanner'
import LoadCard from '../Components/Load Card/LoadCard'

function Men() {
  return (
    <div>
      <Navbar/>
      <MenBanner/>
      <LoadCard title={'Shirts'} />
      <LoadCard title={'Pants'} />
      <LoadCard title={'T-Shirt'} />

      <Footer/>
      <BottomBar/>
    </div>
  )
}

export default Men
