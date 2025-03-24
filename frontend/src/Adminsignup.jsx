import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { API_URL } from "./apiPath.js";
export default function Adminsignup() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [log, setlog] = useState(false);
  const [done, setdone] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
        
      const response = await axios.post(
        `${API_URL}/api/admin/signup`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.setItem("BsId", JSON.stringify(response.data.userId));
      localStorage.setItem("BsName", JSON.stringify(formData.username));
      setFormData({
        name: "",
        email: "",
        address: "",
        password: "",
      });
      setdone(true);
    } catch (error) {
      console.error(
        "❌ Signup Error:",
        error.response ? error.response.data : error
      );
      alert("Signup failed. Try again!");
    }
  };

  function changetolog() {
    setlog(true);
  }
  function changetolog2() {
    
    setlog(true);
  }

  return (
    <div>
      <div className="conatiner-fluid bg bg-grey pd-5">
        <div className="row justify-content-center ">
          {!isMobile ?<div id="signin" style={{ backgroundColor: "rgb(255, 136, 0)" }}  className="col-sm-4 text-center">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1 className="text text-light">Welcome to Sign Up </h1>
            <br />
            <h6 className="text text-light">Do have an account ? </h6>
            <br />
            <button
              id="log-submit"
              style={{borderRadius: "25px"}}
              onClick={changetolog}
              className="bg bg-light pt-2 pb-2 ps-4 pe-4 border border-light"
            >
              <b>Sign In</b>
            </button>
           
          </div>:""}
          {done && <Navigate to="/admin/dashboard" replace state={{ islog: { done } }} />}
          <div className="col-sm-8 text-center mt-5">
            <div className="row">
              <div className="col-sm-1">
                <img className="ms-5" src="logo.png"  style={{ width: "50px",height: "50px"}} alt="" id="logo" />
              </div>
            </div>
            <h1 className="mt-4">CREATE YOUR OWN BUSINESS ACCOUNT</h1>
            <div className="row justify-content-center">
              <div className="col-sm-6">
                <form onSubmit={handleSubmit}>
                  <hr />
                  <br />
                  <input
                    id="log" 
                    style={{width: "100%",
                      height: "50px",
                      borderRadius: "25px"}}
                    type="text"
                    name="name"
                    className="bg bg-grey border border-grey form-control"
                    placeholder="  Username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    type="email"
                    className="bg bg-grey border border-grey form-control"
                    name="email"
                    style={{width: "100%",
                      height: "50px",
                      borderRadius: "25px"}}
                    id="log"
                    placeholder="  Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    type="text"
                    className="bg bg-grey border border-grey form-control"
                    name="address"
                    id="log"
                    style={{width: "100%",
                      height: "50px",
                      borderRadius: "25px"}}
                    placeholder="  Address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    name="password"
                    id="log"
                    style={{width: "100%",
                      height: "50px",
                      borderRadius: "25px"}}
                    type="password"
                    className="bg bg-grey border border-grey form-control"
                    placeholder="  Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <br />
                  <button id="signin"  style={{ backgroundColor: "rgb(255, 136, 0)" }} type="submit" className="btn ps-4 pe-4">
                    <b>Sign Up</b>
                  </button>
                </form>
                {
                  isMobile ?  <button onClick={changetolog2} className="bg bg-light border border-light mt-3"> <b>Already Have Account ?</b> </button>:<></>
                }
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
              {log && <Navigate to="/admin/signin" replace={true} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
