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
import AdminOrders from './Pages/AdminOrders';


function App() {

  return (
    <>
<Routes>
     <Route path="/" element={<Home />} />
     <Route path="category" element={<Category />} />
     <Route path="cart" element={<Cart />} />
     <Route path="orders" element={<Orders />} />
     <Route path="/login" element={<Login />} />
     <Route path="register" element={<RegisterPage />} />
     <Route path="admin/addProduct" element={<AddProduct />} />
     <Route path="admin/createProduct" element={<CreateProduct />} />
     <Route path="admin/allOrders" element={<AdminOrders />} />



</Routes>
  </>
  )
}

export default App
