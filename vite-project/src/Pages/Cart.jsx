import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ShoppingCart from '../Components/Shopping Cart/ShoppingCart'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import Footer from '../Components/Footer/Footer'

function Cart() {
  const product=[
    {
      name:'T-shirt for Men',
      price:1000,
      size:'sm',
      quantity:1,
      image:'https://assets.digitalcontent.marksandspencer.app/image/upload/w_550,h_715,q_auto,f_auto,e_sharpen/w_1008,h_1319,q_auto,f_auto,e_sharpen/OD_01_T43_3599K_MQ_X_EC_0'
    },
    {
      name:'T-shirt for Men',
      price:1000,
      size:'sm',
      quantity:1,
      image:'https://assets.digitalcontent.marksandspencer.app/image/upload/w_550,h_715,q_auto,f_auto,e_sharpen/SD_01_T43_4810_Y0_X_EC_0'
    },
    {
      name:'T-shirt for Men',
      price:1000,
      size:'sm',
      quantity:1,
      image:'https://th.bing.com/th/id/OIP.jxFa0F37MQXu5-PdBMrC5wHaJo?w=202&h=263&c=7&r=0&o=5&dpr=1.5&pid=1.7'
    },
    {
      name:'T-shirt for Men',
      price:1000,
      size:'sm',
      quantity:1,
      image:'https://th.bing.com/th/id/OIP.jxFa0F37MQXu5-PdBMrC5wHaJo?w=202&h=263&c=7&r=0&o=5&dpr=1.5&pid=1.7'
    },
    {
      name:'T-shirt for Men',
      price:1000,
      size:'sm',
      quantity:1,
      image:'https://th.bing.com/th/id/OIP.jxFa0F37MQXu5-PdBMrC5wHaJo?w=202&h=263&c=7&r=0&o=5&dpr=1.5&pid=1.7'
    },
    {
      name:'T-shirt for Men',
      price:1000,
      size:'sm',
      quantity:6,
      image:'https://th.bing.com/th/id/OIP.jxFa0F37MQXu5-PdBMrC5wHaJo?w=202&h=263&c=7&r=0&o=5&dpr=1.5&pid=1.7'
    },
  ]
  return (
    <div>
      <Navbar/>
      <ShoppingCart product={product}/>
      <Footer/>
      <BottomBar/>
    </div>
  )
}

export default Cart
