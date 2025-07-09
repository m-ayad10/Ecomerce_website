import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../Firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

function CreateAccount() {
  const navigate = useNavigate();

  // State variables for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if phone number already exists
      const userRef = doc(db, "Users", phoneNumber); // Assuming phone number is used as the document ID
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setErrorMessage('Phone number already exists. Please use a different number.');
        return; // Stop further execution if phone number exists
      }

      // Proceed with creating the user
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName,
          lastName,
          phoneNumber,
        });
      }
      console.log('User registered successfully');
      navigate('/login');
    } catch (error) {
      console.log(error.message);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Email already exists. Please use a different email.'); // Set error message for duplicate email
      } else {
        setErrorMessage('An error occurred. Please try again.'); // General error message
      }
    }
  };

  return (
    <div>
      <div className='row d-flex justify-content-center'>
        <div className='col-xl-5 col-lg-6 col-md-7 col-sm-9 col-11'>
          <div className='d-flex justify-content-center'>
            <h2 className='login-font'>Create Account!</h2>
          </div>
          {errorMessage && <div className="alert alert-danger"><p>{errorMessage}</p></div>} {/* Display error message */}
          <div className='d-flex justify-content-center'>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input
                  type="text"
                  placeholder='Enter First Name'
                  className="form-control"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input
                  type="text"
                  placeholder='Enter Last Name'
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                <input
                  type="number"
                  placeholder='Enter Phone Number'
                  className="form-control"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  placeholder='Enter Email Address'
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  placeholder='Enter Password'
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn form-submit shadow-none">Submit</button>
            </form>
          </div>
          <div>
            <h6 className='login-font mt-2'>
              Already have an account?
              <a href="" onClick={() => navigate('/login')} className='register-here'>Login here</a>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
