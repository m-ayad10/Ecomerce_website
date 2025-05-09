import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import BottomBar from '../Components/Bottom Bar/BottomBar';
import MenBanner from '../Components/Banner/MenBanner';
import LoadCard from '../Components/Load Card/LoadCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/config';

function Men() {
  const [products, setProducts] = useState([]);
  const [shirts, setShirts] = useState([]);
  const [pants, setPants] = useState([]);
  const [tshirts, setTShirts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setProducts(newData);      

      // Filter products based on gender and category
      setShirts(newData.filter(product => product.gender === "men" && product.category === "Shirt"));
      setPants(newData.filter(product => product.gender === "men" && product.category === "Pant"));
      setTShirts(newData.filter(product => product.gender === "men" && product.category === "T-shirt"));
    };

    fetchData();
  }, []);
  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <div>
      <Navbar />
      <MenBanner />
      <LoadCard title={'Shirts'} product={shirts || []} />
      <LoadCard title={'Pants'} product={pants || []} />
      <LoadCard title={'T-Shirts'} product={tshirts || []} />
      <Footer />
      <BottomBar />
    </div>
  );
}

export default Men;
