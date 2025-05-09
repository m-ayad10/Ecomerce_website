import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ProductCard from '../Components/Product Card/ProductCard'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../Firebase/config'
import Footer from '../Components/Footer/Footer'
import Banner from '../Components/Banner/Banner'
import TopCategory from '../Components/Top Category/TopCategory'
import CenterBanner from '../Components/Banner/CenterBanner'

function Home() {
  const [product,setProduct]=useState([])
  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  useEffect(()=>
  {
    const fetchData=async()=>
    {
      const querySnapshot=await getDocs(collection(db,"Products"))
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setProduct(newData)
    }
    fetchData()
  },[])
  return (
    <div>
      <Navbar/>
        <Banner/>
        <TopCategory/>
        <CenterBanner/>
        <ProductCard products={product} title={'Featured Collection '} />
        <BottomBar/>
        <Footer/>
        
    </div>
  )
}

export default Home
