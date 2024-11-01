import { debounce, slice } from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { SearchQueryContext } from "../../Consonant/SearchQuery";

function SearchList() {
  const {searchQuery,setSearchQuery} =useContext(SearchQueryContext)
  const product = [
    { name: 'T-Shirt', category: 't-shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/products/100001_300882818_045_2_800x.jpg?v=1700645300' },
    { name: 'Pant', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300998494OATMELANGE_1_800x.jpg?v=1729741485' },
    { name: 'Pant', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/products/100001_300860160_069_1_800x.jpg?v=1630675204' },
    { name: 'Hoodies', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300991661WINE_1_800x.jpg?v=1729232962' },
    { name: 'Hoodies', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300996687OFFWHITE_1_800x.jpg?v=1729867883' },
    { name: 'Shirt', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/products/300899568BLACK_2_800x.jpg?v=1700645301' },
    { name: 'T-Shirt', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300951895BLACK_3_800x.jpg?v=1700645635' },
    { name: 'T-Shirt', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300925637MAROON_3_800x.jpg?v=1712228954' },
    { name: 'Shirt', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300925637MAROON_3_800x.jpg?v=1712228954' },
    { name: 'Shirt', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300987406BLACK_1_800x.jpg?v=1724301795' },
    { name: 'Pant', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300998494OATMELANGE_1_800x.jpg?v=1729741485' },
    { name: 'Pant', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/products/100001_300860160_069_1_800x.jpg?v=1630675204' },
    { name: 'Hoodies', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300991661WINE_1_800x.jpg?v=1729232962' },
    { name: 'Hoodies', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300996687OFFWHITE_1_800x.jpg?v=1729867883' },
    { name: 'T-Shirt', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300951895BLACK_3_800x.jpg?v=1700645635' },
    { name: 'Shirt', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/products/300899568BLACK_2_800x.jpg?v=1700645301' },
    { name: 'T-Shirt', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300951895BLACK_3_800x.jpg?v=1700645635' },
    { name: 'T-Shirt', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300925637MAROON_3_800x.jpg?v=1712228954' },
    { name: 'Shirt', category: 'shirt', price: '1500', image: 'https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300925637MAROON_3_800x.jpg?v=1712228954' },
  ];

  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(15);
  const [initialPosts, setInitialPosts] = useState(slice(product, 0, index));

  useEffect(() => {
    setInitialPosts(slice(product, 0, index));
    setIsCompleted(index >= product.length);
  }, [index, product]);

  const loadMore = debounce(() => {
    if (index < product.length) {
      setIndex((prevIndex) => prevIndex + 15);
    }
  }, 200);

  return (
    <div>
      <div className="productCard-border">
        <div className="d-flex flex-wrap justify-content-md-between">
          <input type="search" className="p-1 search-input"  value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Search..." />
          <div className="d-flex flex-wrap">
            <label htmlFor="" className="p-2">
              Category:
            </label>
            <div>
              <select
                class="form-selec ms-2 p-1 m-1"
                aria-label="Default select example"
              >
                <option value="all-products" selected>
                  All Product
                </option>
                <option value="shirt">Shirt</option>
                <option value="pant">Pant</option>
                <option value="tshirt">T-Shirt</option>
              </select>
            </div>
            <div>
              <label htmlFor="" className="p-2">
                Gender:
              </label>
              <select
                class="form-selec ms-2 p-1 m-1"
                aria-label="Default select example"
              >
                <option value="all" selected>
                  All{" "}
                </option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
            <div>
              <label htmlFor="" className="p-2">
                Sort:
              </label>
              <select
                class="form-selec ms-2  p-1 m-1"
                aria-label="Default select example"
              >
                <option value="priceLowHigh" selected>
                  Price low to high{" "}
                </option>
                <option value="priceHighLow" >
                  Price high to low{" "}
                </option>
                
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
        <hr className="w-100 m-2" />

        <div className="">
      
        <div className="card-container">
          {initialPosts.map((obj, idx) => (
            <div key={idx} className="card-box bg-light">
              <div className="d-flex justify-content-center">
                <div className="card-box-image-container">
                  <div className="card-image-box">
                    <img src={obj.image} className="card-box-image cursor-p" alt={obj.name} />
                    <div className="card-icon-cont">
                    <i className="fa-regular fa-heart cursor-p card-font-icon"></i>

                      {/* <i style={{ color: '#FF5A5F' }} className="fa-solid fa-heart cursor-p card-font-icon"></i> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-box-content">
                <p><strong>{obj.name}</strong></p>
                <p className="productCard-category">{obj.category}</p>
                <div className="d-flex justify-content-between">
                  <p className="productCard-price"><strong>₹ {obj.price}</strong></p>
                  <i className="fa-solid fa-cart-plus productCard-cart cursor-p"></i>
                </div>
              </div>
            </div>
          ))}
          
        </div>
        {initialPosts.length > 0 && !isCompleted && (
            <div className="d-flex justify-content-center mt-2">
              <button onClick={loadMore} type="button" className="btn btn-danger shadow-none">Show More +</button>
            </div>
          )}
      </div>
      </div>
    </div>
  );
}

export default SearchList;
