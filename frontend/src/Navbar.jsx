import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Aboutus from "./Aboutus";
import Shop from "./Shop";
import Product from "./Product";
import { useMediaQuery } from "react-responsive";
import { Offcanvas, Button } from "react-bootstrap";
import { API_URL } from "./apiPath.js";

export default function Navbar() {
  const location = useLocation();
  const [m, setm] = useState(false);
  const [s, sets] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

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

      <div className="container-fluid bg bg-dark p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img id="logo" style={{ width: "50px", height: "50px" }} src="logo.png" alt="Logo" />
            <h4 className="text-light ms-3">Foodies</h4>
          </div>
          {!isMobile && (
            <input
              id="log"
              className="form-control mx-3"
              style={{ maxWidth: "400px", borderRadius: "25px" }}
              type="text"
              placeholder="Search Restaurant or Food"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
          {!isMobile ? (
            <div>
              <button onClick={gotohomepage} className="btn btn-light me-2">Homepage</button>
              <button onClick={gotocartpage} className="btn btn-light">Cart</button>
            </div>
          ) : (
            <Button variant="light" onClick={() => setShow(true)}>
              ☰
            </Button>
          )}
        </div>
      </div>

      {/* Offcanvas for Mobile */}
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <button onClick={gotohomepage} className="btn btn-dark w-100 mb-2">Homepage</button>
          <button onClick={gotocartpage} className="btn btn-dark w-100">Cart</button>
          <input
            id="log"
            className="form-control mt-3"
            type="text"
            placeholder="Search Restaurant or Food"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Offcanvas.Body>
      </Offcanvas>

      {choice2 === 1 && <Shop searchQuery={searchQuery} />}
      {choice2 === 2 && <Product searchQuery={searchQuery} />}
      {choice2 === 3 && <Aboutus />}

      <div className="container-fluid bg bg-dark pt-3 mt-5">
        <div className="row justify-content-center">
          <div className="col-sm-4 text-center">
            <p className="text-light">© 2025 Foodies. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
