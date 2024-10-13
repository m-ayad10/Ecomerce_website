import React, { useState } from 'react'
import './ProductView.css'
import './Responsive.css'
import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import shirt1 from '../../assets/shirt-2.jpg'
import shirt2 from '../../assets/shirt3.jpg'
import shirt3 from '../../assets/shirt4.jpg'

import shirt5 from '../../assets//levis-5.jpg'

import { Navigation,FreeMode,Thumbs } from 'swiper/modules';


function ProductView() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const imagesPhoto=[
    {photo:shirt5},
    {photo:shirt1},
    {photo:shirt2},
    {photo:shirt3},
  
   
  ]
    const [quantity, setQuantity] = useState(1);
  return (
    <div>
      <div className="catergory-container row">
        <div className="col-xl-5 col-lg-4 col-md-4 col-sm-5 col-12-img ">
            <div className="cate-image-cont d-flex justify-content-center">
                <div className='img-cont'>
                    <div className='cate-image-box'>
                    <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          '--swiper-navigation-size':'15px'
        }}
        slidesPerView={1}
        spaceBetween={10}
        grabCursor
        loop
        navigation={true}
        onSlideChange={()=>console.log('chn')
        }
        modules={[FreeMode, Navigation, Thumbs]}
        thumbs={thumbsSwiper?{swiper:thumbsSwiper}:undefined}
        className="mySwiper2"
      >
        {imagesPhoto.map((img, index) => (
                    <SwiperSlide key={index} className='d-flex justify-content-center'>
                      <img src={img.photo} className="cate-image" alt={`Slide ${index}`} />
                    </SwiperSlide>
                  ))}
      </Swiper>
                    
                    </div>
                    <div className="img-selec-cont">
                    <Swiper
                    style={{
                      
                      '--swiper-navigation-size':'15px'
                    }}
                            onSlideChange={()=>console.log('chn')}
         watchSlidesProgress={true}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {imagesPhoto.map((img, index) => (
                    <SwiperSlide key={index} className='swiper-slide-1 d-flex justify-content-center'>
                      <img src={img.photo} onClick={()=>setThumbsSwiper(img.photo)} className="cate-image" alt={`Slide ${index}`} />
                    </SwiperSlide>
        ))}      
        </Swiper>
                    
                    </div>
                </div>
            </div>
        </div>
        <div className="col-xl-7 col-lg-8 col-md-8 col-sm-7 col-12-desc  column-desc">
            <h6 className='name-desc'>T shirt men </h6>
            <h6 className="category-card">Men</h6>
            <p className='name-desc '>₹ 9000 </p>
            <select id="cars" aria-placeholder='select'>
            <option value="volvo">Select size</option>

<option value="volvo">sm</option>
<option value="saab">lg</option>
<option value="opel">xl</option>
<option value="audi">xxl</option>
</select>


               <br />
               <div className="d-flex">
                <div className='m-1'>
               <i class="fa-solid fa-minus"  onClick={()=>{
                if(quantity>1)
                setQuantity(quantity-1)}}
                ></i>
                  <input type="number" disabled  className='ms-2 quantity-desc' value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                  <i class="fa-solid fa-plus" onClick={()=>setQuantity(quantity+1)}></i>
                  </div>
                  <button type="button" class="button-desc ms-3 m-1">ADD TO CART</button>
               </div>
            <h6 className='san-font'>Product Details:</h6>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        </div>
        
      </div>
    </div>
  )
}

export default ProductView
