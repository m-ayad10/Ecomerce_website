import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import AdminAddProduct from '../Components/Add Product/AdminAddProduct'
import AdminNavbar from '../Components/Admin Navbar/AdminNavbar'

function AddProduct() {
    const products = [
        {
          name: 'T-shirt for men',
          category: 'T-shirt',
          gender: 'Men',
          price: '2000',
          image: [
            { url: 'https://th.bing.com/th?id=OIP.gQViIiNNJOVDbP6sVGMGCwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2' },
            { url: 'https://www.bing.com/th?id=OPAC.LUfcxL%2btMS%2fkgw474C474&o=5&pid=21.1&w=160&h=235&rs=1&qlt=100&dpr=1.5&c=8&pcl=f5f5f5' }
          ]
        },
        {
          name: 'T-shirt for men',
          category: 'T-shirt',
          gender: 'Men',
          price: '2000',
          image: [
            { url: 'https://th.bing.com/th/id/OIP.dACqEHJ4jdW_2WohmJkb1QHaJ4?w=142&h=189&c=7&r=0&o=5&dpr=1.5&pid=1.7' }
          ]
        },
        {
          name: 'T-shirt for men',
          category: 'T-shirt',
          gender: 'Men',
          price: '2000',
          image: [
            { url: 'https://th.bing.com/th/id/OIP.gtRV3hBK_e7BhJsLoTkTuAHaI4?w=153&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7' }
          ]
        },
        {
          name: 'T-shirt for men',
          category: 'T-shirt',
          gender: 'Men',
          price: '2000',
          image: [
            { url: 'https://th.bing.com/th/id/OIP.dOpv9CQ_8VIJdfAm1fmsmQHaJ8?w=154&h=207&c=7&r=0&o=5&dpr=1.5&pid=1.7' }
          ]
        },
        {
          name: 'T-shirt for men',
          category: 'T-shirt',
          gender: 'Men',
          price: '2000',
          image: [
            { url: 'https://th.bing.com/th?id=OPAC.HKXqG0YmRxPDug474C474&w=165&h=220&c=17&dpr=1.5&pid=21.1' }
          ]
        },
        {
          name: 'T-shirt for men',
          category: 'T-shirt',
          gender: 'Men',
          price: '2000',
          image: [
            { url: 'https://th.bing.com/th?id=OPAC.fao3jyGu8RFCWw474C474&w=165&h=220&c=17&dpr=1.5&pid=21.1' }
          ]
        },
        {
          name: 'T-shirt for men',
          category: 'T-shirt',
          gender: 'Men',
          price: '2000',
          image: [
            { url: 'https://th.bing.com/th?id=OPAC.u%2bu7wtEShum6EA474C474&w=165&h=220&c=17&dpr=1.5&pid=21.1' }
          ]
        },
        {
          name: 'T-shirt for men',
          category: 'T-shirt',
          gender: 'Men',
          price: '2000',
          image: [
            { url: 'https://th.bing.com/th?id=OPAC.GfX5xvDK3uC1gA474C474&w=220&h=210&c=17&o=5&dpr=1.5&pid=21.1' }
          ]
        },
        {
          name: 'T-shirt for men',
          category: 'T-shirt',
          gender: 'Men',
          price: '2000',
          image: [
            { url: 'https://th.bing.com/th?id=OPAC.QbXdt3P9MHR4lQ474C474&w=220&h=210&c=17&o=5&dpr=1.5&pid=21.1' }
          ]
        },
        {
          name: 'T-shirt for men',
          category: 'T-shirt',
          gender: 'Men',
          price: '2000',
          image: [
            { url: 'https://th.bing.com/th?id=OPAC.mTerlvRM9p9Hog474C474&w=220&h=210&c=17&o=5&dpr=1.5&pid=21.1' }
          ]
        },
        {
          name: 'T-shirt for men',
          category: 'T-shirt',
          gender: 'Men',
          price: '2000',
          image: [
            { url: 'https://th.bing.com/th?id=OPAC.rV0a7vYT6SbDTA474C474&w=220&h=210&c=17&o=5&dpr=1.5&pid=21.1' }
          ]
        }
      ];
      
  return (
    <div>
        <AdminNavbar/>
      <AdminAddProduct products={products}/>
    </div>
  )
}

export default AddProduct
