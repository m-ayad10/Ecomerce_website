import React, { useState } from 'react';
import './CreateProduct.css';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../Firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
  const navigate=useNavigate()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [images, setImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered image index
  const [loading,setLoading]=useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const imageUrls=[]
      for(let file of images)
      {
        const storageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(storageRef,file)
        const downloadUrl=await getDownloadURL(storageRef)
        await imageUrls.push({url:downloadUrl})
      }
      console.log(imageUrls);
      
      await addDoc(collection(db,'Products'),
    {
      name,
      description,
      gender,
      category,
      price: Number(price),
      stock: Number(stock),
      imageUrls, // Store array of image URLs
      createdAt: new Date(),
    })
    navigate('/admin/addProduct')
    // Reset form
    setName('');
    setDescription('');
    setGender('');
    setCategory('');
    setPrice(0);
    setStock(1);
    setImages([]);
    } catch (error) {
      console.error('Error uploading product',error);          
    }finally{
      setLoading(false)
    }
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...newFiles]); // Append new files to the existing images
  };

  const handleMouseOver = (index) => {
    setHoveredIndex(index); // Set the index of the image being hovered
  };

  const handleMouseOut = () => {
    setHoveredIndex(null); // Reset when the mouse leaves the image
  };

  const handleDeleteImage = (index) => {
    // Remove image by index
    const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(updatedImages);
  };

  return (
    <div>
      <div className='row d-flex justify-content-center'>
        <div className='col-xl-7 col-lg-6 col-md-7 col-sm-9 col-11'>
          <div className='d-flex justify-content-center'>
            <h2 className='login-font'>Create Product!</h2>
          </div>
          <div className='d-flex justify-content-center'>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">Product name</label>
                <input 
                  type="text" 
                  placeholder='Product name' 
                  name='name' 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="form-control" 
                  id="productName" 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea 
                  className='desc-text' 
                  name='description' 
                  rows={4} 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  id="description"
                />
              </div>
              <div className="mb-3 d-flex">
                <div>
                  <p>Gender</p>
                  <select 
                    className="form-select ms-2 shadow-none " 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    aria-label="Select Gender"
                  >
                    <option value="">Choose Gender</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                  </select>
                </div>
                <div className='ps-3'>
                  <p>Category</p>
                  <select 
                    className="form-select ms-2 shadow-none" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    aria-label="Select Category"
                  >
                    <option value="">Choose Category</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Pant">Pant</option>
                    <option value="T-shirt">T-shirt</option>
                    <option value="Top">Top</option>
                    <option value="Hoodie">Hoodie</option>
                  </select>
                </div>
              </div>
              <div className="mb-3 d-flex">
                <div className='w-25'>
                  <label htmlFor="price" className="form-label">Price</label>
                  <input 
                    type="number" 
                    placeholder='Price' 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    className="form-control" 
                    id="price" 
                  />
                </div>
                <div className='w-25 ps-5'>
                  <label htmlFor="stock" className="form-label">Stock</label>
                  <input 
                    type="number" 
                    placeholder='Stock' 
                    defaultValue={1}
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)} 
                    className="form-control" 
                    id="stock" 
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="images" className="form-label">Images</label>
                <div className='createProduct-img-container'>
                  {images.length > 0 && images.map((img, index) => (
                    <div 
                      className='createProduct-img-box' 
                      key={index} 
                      onMouseOver={() => handleMouseOver(index)} 
                      onMouseOut={handleMouseOut}
                    >
                      <img 
                        className='createProduct-img' 
                        src={URL.createObjectURL(img)} 
                        alt={`Preview ${index + 1}`} 
                      />
                      {hoveredIndex === index && (
                        <div onClick={() => handleDeleteImage(index)}>
                          <i 
                            className="fa-solid fa-trash addProduct-box-icon text-danger" 
                          ></i>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="createProduct-img-ulpoad-box">
                    <label htmlFor="images">
                    <div>
                    <i class="fa-solid fa-cloud-arrow-up" style={{fontSize:'4rem'}}></i>
                    <p>Upload Image</p>
                    </div>
                    <input 
                  type="file" 
                  multiple 
                  onChange={handleImageChange} 
                  className="form-control-input" 
                  id="images" 
                />
                    </label>
                  </div>
                </div>
                
              </div>
              {loading?(
                              <button type="submit" className="btn form-submit shadow-none" >Submiting...</button>
              ):(
                              <button type="submit" className="btn form-submit shadow-none" onClick={()=>handleSubmit}>Submit</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
