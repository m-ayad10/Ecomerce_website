import { useState } from 'react'
import Home from './Pages/Home'
import './App.css'
import { Routes, Route} from "react-router-dom";
import Category from './Pages/Category';
import Login from './Pages/Login';
import RegisterPage from './Pages/RegisterPage';
import AddProduct from './Pages/AddProduct';
import CreateProduct from './Pages/PostProduct';
import Cart from './Pages/Cart';
import Orders from './Pages/Orders';
import Checkout from './Pages/Checkout';
import Address from './Pages/Address';
import Profile from './Pages/Profile';
import Whishlist from './Pages/Whishlist';
import Men from './Pages/Men';
import Women from './Pages/Women';
import Search from './Pages/Search';
import ChangeProduct from './Components/Change Product/ChangeProduct';
import EditProduct from './Pages/EditProduct';
import AdminOrders from './Pages/AdminOrders';


function App() {

  return (
    <>
<Routes>
     <Route path="/" element={<Home />} />
     <Route path="/category/:productId" element={<Category />} />
     <Route path="cart" element={<Cart />} />
     <Route path="checkout" element={<Checkout />} />
     <Route path="addAddress" element={<Address />} />
     <Route path="wishlist" element={<Whishlist />} />
     <Route path="men" element={<Men/>} />
     <Route path="women" element={<Women/>} />
     <Route path="search" element={<Search/>} />


     <Route path="profile" element={<Profile />} />
     <Route path="orders" element={<Orders />} />
     <Route path="/login" element={<Login />} />
     <Route path="register" element={<RegisterPage />} />
     <Route path="admin/editProduct/:productId" element={<EditProduct/>} />
     <Route path="admin/addProduct" element={<AddProduct />} />
     <Route path="admin/createProduct" element={<CreateProduct />} />
     <Route path="admin/allOrders" element={<AdminOrders />} />




</Routes>
  </>
  )
}

export default App
