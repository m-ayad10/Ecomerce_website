import React from 'react'
import { useNavigate } from 'react-router-dom'

function CreateAccount() {
  const navigate=useNavigate()
  return (
    <div>
      <div className='row d-flex justify-content-center'>
      <div className='col-xl-5 col-lg-6 col-md-7 col-sm-9 col-11 '>
        <div className='d-flex justify-content-center'>
        <h2 className='login-font'>Create Account!</h2>

        </div>
        <div className='d-flex justify-content-center'>
        <form>
        <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">First name</label>
    <input type="text" placeholder='Enter First Name' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Last name</label>
    <input type="text" placeholder='Enter Last Name' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Phone number</label>
    <input type="number" placeholder='Enter Phone Number' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" placeholder='Enter Email Address' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" placeholder='Enter Password' class="form-control" id="exampleInputPassword1"/>
  </div>
  
  <button type="submit" class="btn  form-submit">Submit</button>
</form>
           
        </div>
        <div>
            <h6 className='login-font mt-2 '>Already have an account? <a href="" onClick={()=>navigate('/login')} className='register-here' >Login here</a></h6>
           </div>
      </div>
    </div>
    </div>
  )
}

export default CreateAccount
