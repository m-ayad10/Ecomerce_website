import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import AdminAddProduct from '../Components/Add Product/AdminAddProduct'
import AdminNavbar from '../Components/Admin Navbar/AdminNavbar'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../Firebase/config'
import Footer from '../Components/Footer/Footer'

function AddProduct() {
    const [obj,setObj]=useState([])
    useEffect(() => {
      // 👇️ Scroll to top on page load
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);
    useEffect(() => {
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        
        setObj(newData);                
      };
    
      fetchData(); // Call the async function inside useEffect
    }, []);
    
      
  return (
    <div>
        <AdminNavbar/>
      <AdminAddProduct products={obj} setProducts={setObj}/>
      <Footer/>

    </div>
  )
}

export default AddProduct
