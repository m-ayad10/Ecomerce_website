import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ProductCard from '../Components/Product Card/ProductCard'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import Footer from '../Components/Footer/Footer'

function Home() {
  return (
    <div>
        <Navbar/>
        <ProductCard/>
        <BottomBar/>
        <Footer/>
    </div>
  )
}

export default Home
