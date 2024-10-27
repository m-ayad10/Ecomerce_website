import React from 'react'
import './SignIn.css'
import { useNavigate } from 'react-router-dom'
function SignIn() {
  const navigate=useNavigate()
  return (
    <div className='row d-flex justify-content-center'>
      <div className='col-xl-5 col-lg-6 col-md-7 col-sm-9 col-11 '>
        <div className='d-flex justify-content-center'>
        <h2 className='login-font'>Login</h2>

        </div>
        <div className='d-flex justify-content-center'>
        <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  
  <button type="submit" class="btn  form-submit">Submit</button>
</form>
           
        </div>
        <div>
            <h6 className='login-font mt-2 '>Don't have an account? <a href="" onClick={()=>navigate('/register')}  className='register-here' >Register here</a></h6>
           </div>
      </div>
    </div>
  )
}

export default SignIn
