import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ProductView from '../Components/Product View/ProductView'
import ProductCard from '../Components/Product Card/ProductCard'
import BottomBar from '../Components/Bottom Bar/BottomBar'

function Category() {
  return (
    <div>
      <Navbar/>
      <ProductView/>
      <ProductCard/>
      <BottomBar/>

    </div>
  )
}

export default Category
