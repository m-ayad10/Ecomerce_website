import React, {  useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ProductView from '../Components/Product View/ProductView'
import ProductCard from '../Components/Product Card/ProductCard'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../Firebase/config'
import { useParams } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'

function Category() {
  const [product,setProduct]=useState([])
  const [categoryProduct,setCategoryProduct]=useState({})
  const {productId}=useParams()
  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [productId]);
  useEffect(() => {
    const fetchData = async () => {
      try {        
        const docRef = doc(db, 'Products', productId);
        const newData = await getDoc(docRef);
        if (newData.exists()) {
          const productData = newData.data();
          setCategoryProduct({ ...newData.data(), id: productId })
          } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    if (productId) {
      fetchData();
    }
  }, [productId]);
  
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
      <ProductView product={categoryProduct}/>
      <ProductCard products={product} title={'Related Products'}/>
      <BottomBar/>
      <Footer/>


    </div>
  )
}

export default Category
