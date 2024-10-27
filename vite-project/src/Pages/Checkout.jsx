import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import CheckoutPayment from '../Components/Checkout Payment/CheckoutPayment'
import BottomBar from '../Components/Bottom Bar/BottomBar'

function Checkout() {
  return (
    <div>
      <Navbar/>
      <CheckoutPayment/>
      <BottomBar/>
    </div>
  )
}

export default Checkout
