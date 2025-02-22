import React, { useState } from 'react'

import { Navigate } from "react-router-dom";

export default function Signup() {
  const [log,setlog] = useState(false)
    function changetolog(){
      setlog(true)
    }
  return (
       <div>
      <div className="conatiner-fluid bg bg-grey pd-5">
        <div className="row justify-content-center ">
            <div id='signin' className="col-sm-4  text-center"><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <h1 className='text text-light'>Welcome to Sign Up </h1><br />
                <h6 className='text text-light'>Do have an account ? </h6><br />
                <button id='log-submit' onClick={changetolog} className='bg bg-light  pt-2 pb-2 ps-4 pe-4 border border-light '>
                  <b>Sign In</b>
                </button>
                {
                  log && <Navigate to="/signin"  replace={true} />
                }
            </div>
            <div className="col-sm-8   text-center mt-5 ">
              <div className="row">
                <div className="col-sm-1">
                  <img className='ms-5' src="logo.png" alt="" id="logo"/>
                </div>
              </div>
              <h1 className='mt-4'>CREATE YOUR OWN ACCOUNT</h1>
                <div className="row justify-content-center">
               <div className="col-sm-6">
               <form >
                    <hr /><br />
                    <input id='log'  type="text" name='username'  className=" bg bg-grey border border-grey form-control" placeholder='  Username' required/><br />
                    <input type="email"    className=" bg bg-grey border border-grey form-control" name="Email" id='log' placeholder='  Email' required/><br />
                    <select  className='text text-secondary border border-grey' name="accesstype" id="log" required>
                        <option value="Choose category">&nbsp; &nbsp; Choose category</option>
                        <option value="Training and placement officer">&nbsp; &nbsp;Training and placement officer</option>
                        <option value="Class Teacher">&nbsp; &nbsp;Class Teacher</option>
                        <option value="Student">&nbsp; &nbsp;Student</option>
                    </select>
                    <br /><br />
                    <input name='password'  id='log' type="password" className="bg bg-grey border border-grey form-control " placeholder='  Password' required/><br /><br />
                    
                <br /><br />
                <button id='signin' type='submit' className='btn ps-4 pe-4' ><b>Sign Up</b></button>
                </form>
                <br /><br /><br /><br /><br /><br />
               </div>
                </div>
            </div>
        </div>
      </div>
    
    </div>
  )
}