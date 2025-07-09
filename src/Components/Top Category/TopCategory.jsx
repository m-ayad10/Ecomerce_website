import React from 'react'
import './TopCategory.css'

function TopCategory() {
  return (
    <div>
      <div className="d-flex justify-content-center mt-3">
        <h4 className='san-font'>Top Category</h4>
      </div>
      <div className="productCard-border pb-0">
        <div className="topCategory-container">
            <div className="topCategory-box ">
                <div className='d-flex justify-content-center'>
                   <img src="https://img.freepik.com/free-photo/still-life-with-classic-shirts-hanger_23-2150828622.jpg?uid=R170895572&ga=GA1.1.1295561974.1730122640 " alt="" className="topCategory-image cursor-p" />
                </div>
                <div className="d-flex justify-content-center">
                    <p className="san-font mt-1 m-0">Shirt</p>
                </div>
            </div>
            <div className="topCategory-box">
                <div className='d-flex justify-content-center'>
                   <img src="https://img.freepik.com/free-photo/light-brown-beige-pants-indoors-still-life_23-2150756262.jpg?t=st=1730134696~exp=1730138296~hmac=e62a16f0d9844ad8997a52a98ff7efec46daed7114937ea9345eb4da4f864331&w=360" alt="" className="topCategory-image cursor-p" />
                </div>
                <div className="d-flex justify-content-center">
                    <p className="san-font mt-1 m-0">Pant</p>
                </div>
            </div>
            <div className="topCategory-box">
                <div className='d-flex justify-content-center'>
                   <img src="https://img.freepik.com/free-photo/red-pullover-hanging_23-2147704088.jpg?t=st=1730136244~exp=1730139844~hmac=cfedebe5985641c3e5464d28c790d157337152af08712188303aac5ffd847360&w=360" alt="" className="topCategory-image cursor-p" />
                </div>
                <div className="d-flex justify-content-center">
                    <p className="san-font mt-1 m-0">T-Shirt</p>
                </div>
            </div>
            <div className="topCategory-box">
                <div className='d-flex justify-content-center'>
                   <img src="https://img.freepik.com/free-photo/medium-shot-senior-man-wearing-mask_23-2149324130.jpg?t=st=1730136469~exp=1730140069~hmac=d497757abb6bdbfc011e4dfda71d72dc51d8149dbee394756f9798e4907eb9cb&w=360" alt="" className="topCategory-image cursor-p" />
                </div>
                <div className="d-flex justify-content-center">
                    <p className="san-font mt-1 m-0">Hoodies</p>
                </div>
            </div>
            <div className="topCategory-box">
                <div className='d-flex justify-content-center'>
                   <img src="https://img.freepik.com/free-photo/studio-with-props-fashion-shoting_23-2148885692.jpg?t=st=1730136697~exp=1730140297~hmac=89eae62735005ac414fa47f616e1efbb50479b3c4f94c7ec85c4a367090856eb&w=360" alt="" className="topCategory-image cursor-p" />
                </div>
                <div className="d-flex justify-content-center">
                    <p className="san-font mt-1 m-0 ">Shirt</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TopCategory
