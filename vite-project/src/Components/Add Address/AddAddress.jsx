import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function AddAddress() {
  const navigate = useNavigate();
  
  // useState hooks for each input fieldc
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');


  const handleSubmit = async (e) => {
    
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
