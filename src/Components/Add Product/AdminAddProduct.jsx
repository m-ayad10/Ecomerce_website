import React, { useContext, useEffect, useState } from 'react';
import './AddProduct.css';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase/config'; // Make sure to import your Firestore config
import { EditProductContext } from '../../ContextApi/EditProductContext';

function AdminAddProduct({ products, setProducts }) { // Add setProducts to manage state
  const navigate = useNavigate();
  const { setEditId } = useContext(EditProductContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(()=>
  {
    setFiltered([...products])
  },[products])


  const onChangeProduct = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter products based on the search query
    if (query && query.trim() !== '') {
      const filteredProducts = products.filter((obj) =>
      obj.category.toLowerCase()===query.toLowerCase())
      setFiltered(filteredProducts);
    } else {
      // If the searchQuery is empty or null, show all products
      setFiltered([...products]);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const productDoc = doc(db, "Products", id);
      await deleteDoc(productDoc);
      console.log('Deleted Product with id:', id);

      // Update products state after deletion
      setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  return (
    <div className='productCard-border'>
      <section className='add-product'>
        <h4 className='san-font'>Add Product</h4>
        <div className="d-flex justify-content-between">
          <div className='d-flex'>
            <input type="search" className="form-control" placeholder='Search' />
            <select
        className="form-select ms-2 shadow-none"
        onChange={onChangeProduct} // Handle category change
        aria-label="Default select example"
      >
        <option value="">All Products</option>
        <option value="Shirt">Shirt</option>
        <option value="Pant">Pant</option>
        <option value="T-Shirt">T-Shirt</option>
        <option value="Top">Top</option>
        <option value="Hoodie">Hoodie</option>
      </select>
          </div>
          <button type="button" className="btn btn-primary san-font shadow-none" onClick={() => navigate('/admin/createProduct')}>
            + Create New
          </button>
        </div>
        <hr className='addProduct-hr' />
      </section>
      <div className='productCard-container d-flex justify-content-center'>
      <div className="card-container ">
            {
                filtered.map((obj)=>
                {
                    return(
                        <div className="card-box bg-light mb-2" >
            <div className="d-flex justify-content-center">
              <div className="card-box-image-container">
                <div className="card-image-box">
                  <img
                    src={obj.imageUrls[0]?.url || ''}
                    className="card-box-image "
                    alt=""
                   
                  />
                  
                </div>
              </div>
            </div>
            <div className="card-box-content mb-0">
              <p className='productCard-details-name'><strong>{obj.name}</strong></p>
              <p className="productCard-category">{obj.category}</p>
              <p><strong> ₹ {obj.price}</strong></p>
              
            </div>
            <div className='d-flex justify-content-between  '>
                  <button className='btn btn-light shadow-none m-0' onClick={() => { setEditId(obj.id); navigate(`/admin/editProduct/${obj.id}`); }} type='button'>
                    <i className="fa-solid fa-pen addProduct-box-icon m-0 p-0" style={{ color: 'silver' }}></i> Edit
                  </button>
                  <button className='btn btn-light shadow-none m-0 ' type='button' onClick={() => deleteProduct(obj.id)}>
                    <i className="fa-solid fa-trash addProduct-box-icon m-0 p-0" style={{ color: 'red' }}></i> Delete
                  </button>
                </div>
          </div>
                    )
                })
            }

        </div>
        
      </div>
    </div>
  );
}

export default AdminAddProduct;
