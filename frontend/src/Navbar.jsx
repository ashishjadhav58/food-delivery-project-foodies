import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Aboutus from "./Aboutus";
import Shop from "./Shop";
import Product from "./Product";
import { API_URL } from "./apiPath.js";

export default function Navbar() {
  const location = useLocation();
  const [m, setm] = useState(false);
  const [s, sets] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const choice2 = location.state?.choice; 
  console.log(choice2);

  function gotohomepage() {
    setm(true);
  }
  function gotocartpage() {
    sets(true);
  }
  return (
    <div>
      {m && <Navigate to="/" replace={true} />}
      {s && <Navigate to="/addcart" replace={true} />}

      <div className="container-fluid bg bg-dark">
        <div className="row">
          <div className="col-sm-3 text-center p-4">
            <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-1">
                <img id="logo" className="text-center" style={{ width: "50px",height: "50px"}} src="logo.png" alt="Logo" />
              </div>
              <div className="col-sm-5">
                <h4 className="text text-light mt-2 ms-3">Foodies</h4>
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-4 pt-4">
            
            <input 
              id="log"
              style={{ 
                width: "100%", 
                height: "50px", 
                borderRadius: "25px" 
              }}
              
              type="text"
              placeholder=" Search Restaurant or Food"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-3 text-light pt-4">
            <button onClick={gotohomepage} className="btn btn-light me-1">Homepage</button>
            <button  onClick={gotocartpage} className="btn btn-light ms-1">Cart</button>
          </div>
        </div>
      </div>
      {choice2 === 1 && <Shop searchQuery={searchQuery} />}
      {choice2 === 2 && <Product searchQuery={searchQuery} />}
      {choice2 === 3 && <Aboutus />}

      <div className="container-fluid bg bg-dark pt-3 mt-5">
        <div className="row justify-content-center">
          <div className="col-sm-4 text-center">
            <p className="text text-light">© 2025 Foodies. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
