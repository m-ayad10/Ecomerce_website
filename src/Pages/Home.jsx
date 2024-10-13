import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ProductCard from '../Components/Product Card/ProductCard'
import BottomBar from '../Components/Bottom Bar/BottomBar'

function Home() {
  return (
    <div>
        <Navbar/>
        <ProductCard/>
        <BottomBar/>
    </div>
  )
}

export default Home
