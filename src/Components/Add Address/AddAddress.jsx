import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../../Firebase/config';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID function

function AddAddress() {
  const navigate = useNavigate();

  // useState hooks for each input field
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the address object to be added
    const newAddress = {
      id: uuidv4(), // Generate a unique ID for the address
      fullName,
      mobileNumber,
      address,
      pincode,
      city,
      state,
      addedAt: new Date() // Optional: Add timestamp
    };

    const user = auth;
    const userId = user.currentUser;

    // Reference to the user's document in Firestore
    const userDocRef = doc(db, 'Users', userId.uid);

    try {
      // Push the new address into the 'addresses' array field
      await updateDoc(userDocRef, {
        addresses: arrayUnion(newAddress) // Adds the new address to the array
      });

      navigate(-1); // Redirect after submission
    } catch (error) {
      console.error('Error adding address: ', error);
    }
  };

  return (
    <div>
      <div className='row d-flex justify-content-center'>
        <div className='col-xl-5 col-lg-6 col-md-7 col-sm-9 col-11'>
          <div className='d-flex justify-content-center'>
            <h2 className='login-font'>Add Address!</h2>
          </div>
          <div className='d-flex justify-content-center'>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label className='form-label'>Full name (First and Last name)</label>
                <input
                  type='text'
                  placeholder='Enter Full Name'
                  className='form-control'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Mobile number</label>
                <input
                  type='text'
                  placeholder='Enter Mobile Number'
                  className='form-control'
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Flat, House no., Building, Company, Apartment</label>
                <input
                  type='text'
                  placeholder='Enter Address'
                  className='form-control'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Pincode</label>
                <input
                  type='text'
                  placeholder='Enter Pincode'
                  className='form-control'
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Town/City</label>
                <input
                  type='text'
                  placeholder='Enter City'
                  className='form-control'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label '>State</label>
                <input
                  type='text'
                  placeholder='Enter State'
                  className='form-control'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <button type='submit' className='btn form-submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
