import React from 'react'
import Homepage from './Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './Signin';
import Signup from './Signup';
import Shop from './Shop';
import Product from './Product';
import Aboutus from './Aboutus';
import AddCart from './AddCart';
import Navbar from './Navbar';
import Admin from './admin';
import Adminsignup from './Adminsignup';
import AdminAccess from './AdminAccess';
export default function App() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/addcart' element={<AddCart/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/product' element={<Navbar/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/admin/signin' element={<Admin/>}/>
          <Route path='/admin/signup' element={<Adminsignup/>}/>
          <Route path='/admin/dashboard' element={<AdminAccess/>}/>
        </Routes>
    </div>

  )
}
