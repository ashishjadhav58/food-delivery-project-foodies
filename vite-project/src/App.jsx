import React from 'react'
import Homepage from './Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './Signin';
import Signup from './Signup';
import Shop from './Shop';
import Product from './Product';
import Aboutus from './Aboutus';
import Navbar from './Navbar';
export default function App() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/product' element={<Navbar/>}/>
        </Routes>
    </div>

  )
}
