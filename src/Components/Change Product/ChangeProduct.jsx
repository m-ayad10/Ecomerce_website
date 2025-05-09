import React, { useContext, useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { db, storage } from '../../Firebase/config';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { EditProductContext } from '../../ContextApi/EditProductContext';

function ChangeProduct({productId}) {
  const { editId } = useContext(EditProductContext);
    useEffect(() => {

      // 👇️ Scroll to top on page load
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [editId]);
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [images, setImages] = useState([]); // Newly added images
  const [existingImages, setExistingImages] = useState([]); // Existing images
  const [imagesToDelete, setImagesToDelete] = useState([]); // Images to be deleted
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(productId);
        const docRef = doc(db, "Products", productId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const productData = docSnap.data();
  
          // Safely set form fields
          setName(productData.name || '');
          setDescription(productData.description || '');
          setGender(productData.gender || '');
          setCategory(productData.category || '');
          setPrice(productData.price || '');
          setStock(productData.stock || '');
          setExistingImages(productData.imageUrls || []); // Ensure it's an array
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
  
    fetchProduct();
  }, [productId]);
  

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...newFiles]); // Append new files to existing images
  };

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(null);
  };

  const handleDeleteImage = (index, isExisting = false) => {
    if (isExisting) {
      const imageToDelete = existingImages[index];
      if (imageToDelete.ref) {
        setImagesToDelete((prev) => [...prev, imageToDelete.ref]); // Track image reference for deletion
      }
      const updatedExistingImages = existingImages.filter((_, imgIndex) => imgIndex !== index);
      setExistingImages(updatedExistingImages); // Remove from state
    } else {
      const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
      setImages(updatedImages); // Remove new image from state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productRef = doc(db, "Products", productId);
    let uploadedImageUrls = [...existingImages]; // Start with existing images

    // Delete marked images from Firebase Storage
    for (let refToDelete of imagesToDelete) {
      const imageRef = ref(storage, refToDelete);
      try {
        await deleteObject(imageRef);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    // Upload new images to Firebase Storage
    for (let image of images) {
      const storageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      uploadedImageUrls.push({ url, ref: storageRef.fullPath });
    }

    // Update Firestore with edited data
    await updateDoc(productRef, {
      name,
      description,
      gender,
      category,
      price: Number(price),
      stock: Number(stock),
      imageUrls: uploadedImageUrls, // Store updated image URLs
      createdAt: new Date(),
    });

    setLoading(false);
    navigate('/admin/addProduct'); // Redirect after successful update
  };

  return (
    <div>
      <div className='row d-flex justify-content-center'>
        <div className='col-xl-7 col-lg-6 col-md-7 col-sm-9 col-11'>
          <div className='d-flex justify-content-center'>
            <h2 className='login-font'>Edit Product!</h2>
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
                    className="form-select ms-2 shadow-none" 
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
                  {/* Existing images */}
                  {existingImages.length > 0 && existingImages.map((img, index) => (
                    <div 
                      className='createProduct-img-box' 
                      key={index} 
                      onMouseOver={() => handleMouseOver(index)} 
                      onMouseOut={handleMouseOut}
                    >
                      <img 
                        className='createProduct-img' 
                        src={img.url} 
                        alt={`Existing ${index + 1}`} 
                      />
                      {hoveredIndex === index && (
                        <div onClick={() => handleDeleteImage(index, true)}>
                          <i className="fa-solid fa-trash addProduct-box-icon text-danger"></i>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* New images */}
                  {images.map((img, index) => (
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
                          <i className="fa-solid fa-trash addProduct-box-icon text-danger"></i>
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
              <button type="submit" className="btn form-submit shadow-none mb-4">
                {loading ? 'Updating...' : 'Update Product'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeProduct;
