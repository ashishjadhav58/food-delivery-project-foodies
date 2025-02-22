import React, { useEffect, useState } from 'react'
import './style.css'

import { Navigate } from "react-router-dom";
export default function Signin() {
  const [Tosignup,setsp] = useState(false)
  function changes(){
    setsp(true)
  }
  return (
    <div>
      <div className="conatiner-fluid bg bg-grey pd-5">
        <div className="row justify-content-center ">
            <div className="col-sm-8   text-center mt-5 ">
              <div className="row">
                <div className="col-sm-1">
                  <img className='ms-5' src="logo.png" alt="" id="logo"/>
                </div>
              </div><br /><br />
              <h1 className='mt-5'>LOGIN TO YOUR ACCOUNT</h1>
                <div className="row justify-content-center">
               <div className="col-sm-6">
               <form >
                    <hr /><br />
                    <input id='log' type="text"  className=" bg bg-grey border border-grey form-control" name='username' placeholder='  Username'/><br />
                    <input id='log' type="password"  className="bg bg-grey border border-grey form-control " name='password' placeholder='  Password'/><br /><br />
                <br /><br />
                <button id='signin' type='submit' className='btn  pt-2 pb-2 ps-4 pe-4 '><b>Sign In</b></button>
                </form>
                <br /><br /><br /><br /><br /><br />
                
               </div>
                </div>
            </div>
            <div id='signin' className="col-sm-4 text-center"><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <h1 className='text text-light'>Welcome to Sign In </h1><br />
                <h6 className='text text-light'>Don't have an account ? </h6><br />
                <button id='log-submit' onClick={changes} className='bg bg-light border border-light pt-2 pb-2 ps-4 pe-4'>
                  <b>Sign Up</b>
                </button>
                {
                  Tosignup == true ? <Navigate to="/Signup"  replace={true} /> : ""
                }
            </div>
        </div>
      </div>
    </div>
  )
}
