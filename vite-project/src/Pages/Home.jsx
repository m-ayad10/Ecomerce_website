import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ProductCard from '../Components/Product Card/ProductCard'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import Footer from '../Components/Footer/Footer'
import Banner from '../Components/Banner/Banner'
import TopCategory from '../Components/Top Category/TopCategory'
import CenterBanner from '../Components/Banner/CenterBanner'

function Home() {
  return (
    <div>
        <Navbar/>
        <Banner/>
        <TopCategory/>
        <CenterBanner/>
        <ProductCard title={'Featured Collection '} />
        <BottomBar/>
        <Footer/>
    </div>
  )
}

export default Home
