import React from 'react'
import './AddProduct.css'
import { useNavigate } from 'react-router-dom'

function AdminAddProduct({products}) {
  const navigate=useNavigate()

  return (
    <div className=''>
      <section className='add-product '>
        <h4 className='san-font'>Add Product</h4>
        <div className="d-flex justify-content-between">
          <div className='d-flex'>
          <input type="search form-control" placeholder='Search' name="" id="" />
          <select class="form-selec ms-2" aria-label="Default select example">
  <option selected>All Product</option>
  <option value="1">Shirt</option>
  <option value="2">Pant</option>
  <option value="3">T-Shirt</option>
</select>
          </div>
          
          
          
          <button type="button" class="btn btn-primary san-font" onClick={()=>navigate('/admin/createProduct')}>+ Create New</button>
          </div>
        <hr className='addProduct-hr' />  

        <div className='addProduct-image-container'>
          <div className='addProduct-image-box bg-light' >
            <div >
            <img src="https://th.bing.com/th?id=OIP.Ub6YpRIAymTwuyjRcSD92QHaIL&w=237&h=262&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" alt="" />
            </div>
            <span className='image-box-content'>
              <span>T-shirt for men</span>  <br />
               <span className='box-content-price'><i class="fa-solid fa-indian-rupee-sign addProduct-box-icon"></i>.2000</span> <br />
              <span className='d-flex justify-content-between'>
                <button className='btn btn<i class="fa-solid fa-indian-rupee-sign"></i>light' type='button'><i class="fa-solid fa-pen addProduct-box-icon"  style={{color:'silver'}} ></i> Edit </button>
                <button className='btn btn-light' type='button'><i class="fa-solid fa-trash addProduct-box-icon" style={{color:'red'}}></i> Delete </button>

              </span>
            </span>
            
          </div>
          {products.map((obj)=>{
            return(
              <div className='addProduct-image-box bg-light' >
            <div className='bg-light'>
            <img src={obj.image[0].url} alt="" className='bg-light'/>
            </div>
            <span className='image-box-content'>
              <span>{obj.name}</span>  <br />
               <span className='box-content-price'><i class="fa-solid fa-indian-rupee-sign addProduct-box-icon"></i>.{obj.price} </span> <br />
              <span className='d-flex justify-content-between'>
                <button className='btn btn-light' type='button'><i class="fa-solid fa-pen addProduct-box-icon"  style={{color:'silver'}} ></i> Edit </button>
                <button className='btn btn-light' type='button'><i class="fa-solid fa-trash addProduct-box-icon" style={{color:'red'}}></i> Delete </button>

              </span>
            </span>
            
          </div>
            )
          })}
          
        </div>
      </section>
    </div>
  )
}

export default AdminAddProduct  
