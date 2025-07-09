import React, { useState } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/config';
import Swal from 'sweetalert2';

function SignIn() {
  const navigate = useNavigate();


  // State variables for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  
    const showErrorAlert = (message) => {
      Swal.fire({
        title: 'Error',
        text: message || 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-swal-popup',
        },
      });
    };
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully');
      Swal.fire({
        title: 'Success',
        text: 'You have successfully logged in!',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-swal-popup',
        },
      }).then(() => {
        navigate('/'); // Redirect after success
      });
    } catch (error) {
      console.error('Error during sign-in:', error.message);
  
      // Customize error messages based on Firebase error codes
      switch (error.code) {
        case 'auth/invalid-email':
          showErrorAlert('Invalid email address. Please check and try again.');
          break;
        case 'auth/user-not-found':
          showErrorAlert('No user found with this email. Please sign up first.');
          break;
        case 'auth/wrong-password':
          showErrorAlert('Incorrect password. Please try again.');
          break;
        default:
          showErrorAlert('Unable to sign in. Please check your credentials.');
      }
    }
  };
  return (
    <div className='row d-flex justify-content-center'>
      <div className='col-xl-5 col-lg-6 col-md-7 col-sm-9 col-11 '>
        <div className='d-flex justify-content-center'>
          <h2 className='login-font'>Login</h2>
        </div>
        <div className='d-flex justify-content-center'>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email} // bind state to email input
                onChange={(e) => setEmail(e.target.value)} // update state on input change
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password} // bind state to password input
                onChange={(e) => setPassword(e.target.value)} // update state on input change
              />
            </div>
            <button type="submit" className="btn form-submit shadow-none" onClick={()=>handleSubmit}>Submit</button>
          </form>
        </div>
        <div>
          <h6 className='login-font mt-2'>
            Don't have an account? 
            <a href="" onClick={() => navigate('/register')} className='register-here'>
              Register here
            </a>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
