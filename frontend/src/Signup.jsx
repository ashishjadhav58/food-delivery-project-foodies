import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./style.css";


export default function Signup() {
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
      const response = await axios.post(
        "http://localhost:3000/api/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.setItem("userId", JSON.stringify(response.data.userId));
      localStorage.setItem("userName", JSON.stringify(response.data.userName));
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

  return (
    <div>
      <div className="conatiner-fluid bg bg-grey pd-5">
        <div className="row justify-content-center ">
          <div id="signin" className="col-sm-4 text-center">
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
              onClick={changetolog}
              className="bg bg-light pt-2 pb-2 ps-4 pe-4 border border-light"
            >
              <b>Sign In</b>
            </button>
            {log && <Navigate to="/signin" replace={true} />}
          </div>
          {done && <Navigate to="/" replace state={{ islog: { done } }} />}
          <div className="col-sm-8 text-center mt-5">
            <div className="row">
              <div className="col-sm-1">
                <img className="ms-5" src="logo.png" alt="" id="logo" />
              </div>
            </div>
            <h1 className="mt-4">CREATE YOUR OWN ACCOUNT</h1>
            <div className="row justify-content-center">
              <div className="col-sm-6">
                <form onSubmit={handleSubmit}>
                  <hr />
                  <br />
                  <input
                    id="log"
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
                    placeholder="  Address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    name="password"
                    id="log"
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
                  <button id="signin" type="submit" className="btn ps-4 pe-4">
                    <b>Sign Up</b>
                  </button>
                </form>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
