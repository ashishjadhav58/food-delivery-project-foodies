import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import FoodSection from "./FoodSection";
import DiningSection from "./DiningSection";
import OrderSection from "./OrderSection";
import { Navigate } from "react-router-dom";

export default function AdminAccess() {
  const media = useMediaQuery({ maxWidth: 768 });
  const name = JSON.parse(localStorage.getItem("BsName"))
  const id = JSON.parse(localStorage.getItem("BsId"))
  console.log(name);
  
  const [cn,setcn] = useState(1)
  function change(e){
    setcn(parseInt(e.target.id));
  }
  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center pt-3 pb-3 bg bg-danger">
          <div className="col-sm-5">
            <h1 className="text-center text text-white">{name} {media?<>
            <>
              <button
                class="btn btn-danger ms-5"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
              >
                <b>&#9776;</b>
              </button>
            </>
          </>:""}</h1>
            
          </div>
          {!media ? (
            <>
              {" "}
              <div className="col-sm-4 pt-2 text-end me-2">
                <button className="btn btn-danger me-2" id="1" onClick={(event)=>change(event)}>Dining</button>
                <button className="btn btn-danger me-2" id="2" onClick={(event)=>change(event)}>Food</button>
                <button className="btn btn-danger me-2" id="3" onClick={(event)=>change(event)}>Orders</button>
              </div>
              <div className="col-sm-2 pt-2">
                <button className="btn btn-light" id="4" onClick={(event)=>change(event)}>LOGOUT</button>
              </div>
            </>
          ) : ""}
        </div>
        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasExample"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title">Menu</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div class="offcanvas-body text-center">
            <button class="btn btn-secondary text-center ps-5 pe-5" data-bs-dismiss="offcanvas" id="1" onClick={(event)=>change(event)}>
              Dining
            </button><br /><br />
            <button id="2" class="btn btn-secondary  ps-5 pe-5" data-bs-dismiss="offcanvas" onClick={(event)=>change(event)}>
              Food
            </button><br /><br />
            <button id="3" class="btn btn-secondary  ps-5 pe-5" data-bs-dismiss="offcanvas" onClick={(event)=>change(event)}>
              Order
            </button><br /><br />
            <button id="4" class="btn btn-secondary  ps-5 pe-5" data-bs-dismiss="offcanvas" onClick={(event)=>change(event)}>
              Logout
            </button><br /><br />
          </div>
        </div>
      </div>
      <div className="row">
      <>
  {cn === 1 && <DiningSection />}
  {cn === 2 && <FoodSection />}
  {cn === 3 && <OrderSection />}
  {cn === 4 && (
  <>
    {localStorage.removeItem("BsName")}
    {localStorage.removeItem("BsId")}
    <Navigate to="/" replace={true} />
  </>
)}

</>
      </div>
    </div>
  );
}
