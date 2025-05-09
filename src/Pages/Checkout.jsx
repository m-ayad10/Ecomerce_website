import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import CheckoutPayment from '../Components/Checkout Payment/CheckoutPayment';
import BottomBar from '../Components/Bottom Bar/BottomBar';
import { auth, db } from '../Firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Footer from '../Components/Footer/Footer';

function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [userId, setUserId] = useState(null); // Initial state is null
  useEffect(() => {
    // 👇️ Scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set user ID if user is logged in
      } else {
        setUserId(null); // Clear user ID if no user is logged in
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (userId) { // Only fetch addresses if userId is available
        try {
          const userDocRef = doc(db, 'Users', userId); // Reference to the user's document
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            // Set addresses array from the document data
            setAddresses(docSnap.data().addresses || []);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      }
    };

    fetchAddresses();
  }, [userId]); // Dependency on userId

  return (
    <div>
      <Navbar />
      <CheckoutPayment addresses={addresses} setAddresses={setAddresses} />
      <Footer/>
      <BottomBar />
    </div>
  );
}

export default Checkout;
