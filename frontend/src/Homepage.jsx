import React, { useState, useEffect } from "react";
import "./assets/style.css";


import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Homepage() {
  const location = useLocation();
  const [data2, setdata2] = useState([]);
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/top/products"); 
        setdata2(response.data);
      } catch (err) {
        console.error("Error fetching shop data:", err);
      } 
    };
    fetchShops();
  }, []);
  const [navchoice, setnav] = useState(0);
  const [data, setdata] = useState([
    { name: "Burger", count: 1 },
    { name: "Biryani", count: 1 },
    { name: "Chinese", count: 3 },
    { name: "Cakes", count: 1},
    { name: "Pizza", count: 3 }
  ]);
  const [choice, setChoice] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });
  const [signin, setSignIn] = useState(false);
  const user1 = localStorage.getItem("userName");

  useEffect(() => {
    if (location.state?.islog?.done) {
      setChoice(true);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
    }
  }, [location.state]);

  const logout = () => {
    const confirmLogout = window.confirm("Really want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("isLoggedIn");
      setChoice(false);
    }
  };

  function opensignin() {
    setSignIn(true);
  }

    function navaction(Event){
      const selectedNav = parseInt(Event.currentTarget.id);
      setnav(selectedNav);
    }
  

  return (
    <div className="bg bg-light">
      <div className="container-fluid bg bg-dark">
        <div className="row">
          <div className="col-sm-3 text-center p-4">
            <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-1">
                <img id="logo" className="text-center" src="logo.png" alt="Logo" />
              </div>
              <div className="col-sm-5">
                <h4 className="text text-light mt-2 ms-3">Foodies</h4>
              </div>
            </div>
          </div>
          <div className="col-sm-3"></div>
          <div className="col-sm-6 p-4">
            <button id="0" onClick={navaction} className='btn btn-dark m-2'>Home</button>
            <button id="1" onClick={navaction} className='btn btn-dark m-2'>Hotel</button>
            <button id="2" onClick={navaction} className='btn btn-dark m-2'>Product</button>
            <button id="3" onClick={navaction} className='btn btn-dark m-2'>About Us</button>
            {choice ? (
              <button className="btn btn-dark ps-3 pe-3 ms-4" onClick={logout} id="signin">
                Welcome {user1}
              </button>
            ) : (
              <button className="btn btn-dark ps-3 pe-3 ms-4" id="signin" onClick={opensignin}>
                Sign In
              </button>
            )}
          </div>
          {navchoice > 0 && <Navigate to="/product" replace state={{ choice: navchoice }} />}
          {signin && <Navigate to="/signin" replace={true} />}
        </div></div>
        <div className="container bg bg-light pt-5">
                <div className="row">
                    <div className="col-sm-5 border border-grey rounded" id="effecthm" >
                        <div className="row" id="2"  onClick={navaction} >
                            <div className="col-sm-12" id="img-home">
                                <img className='rounded' id="img-home" src="online-home.jpg" alt="Order Online" />
                            </div>
                        </div>
                        <div className="row" id="2"  onClick={navaction}>
                            <div  className="col-sm-12 text-center mt-2" >
                                <h5>Order Online</h5>
                                <p>Stay home and order to your doorstep</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2"></div>
                    <div className="col-sm-5 border border-grey rounded" id="effecthm">
                        <div className="row" id="1"  onClick={navaction}>
                            <div className="col-sm-12" id="img-home">
                                <img className='rounded' id="img-home" src="Dining-home.jpg" alt="Dining" />
                            </div>
                        </div>
                        <div className="row" id="1"  onClick={navaction}>
                            <div className="col-sm-12 text-center mt-2">
                                <h5>Dining</h5>
                                <p>View the city's favourite dining venues</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5 bg bg-light">
              <h1 className='mb-3'>Collection</h1>
                <div className="row justify-content-center">
                    {data.map((item, index) => (
                        <div className="col-sm-2 border border-grey text-center m-2" id='collections' key={index} >
                            <div className="row justify-content-center"  id="2"  onClick={navaction}>
                                <div className="col-sm-8">
                                    <img src="collection-img.png" id="imgs" alt={item.name} />
                                </div>
                            </div>
                            <div className="row" id="2"  onClick={navaction}>
                                <h5>{item.name}</h5>
                                <p>{item.count} Restaurants</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container mt-5 bg bg-light">
              <h1 className='mb-3'>Top Restaurants</h1>
                <div className="row">
                    {data2.map((restaurant, index) => (
                         <div key={index} className="col-md-3 rounded " id="1" onClick={navaction}>
                         <div className="card shadow-sm p-3 mb-4" onClick={navaction} id="2">
                           <img onClick={navaction} 
                             src={restaurant.image} 
                             className="card-img-top rounded"
                             alt={restaurant.name}
                             id="imgss"
                           />
                           <div className="card-body" onClick={navaction} id="">
                             <div className="d-flex justify-content-between align-items-center">
                               <span className="badge bg-success text-white p-2" onClick={navaction} id="2">
                                 {restaurant.rating} ⭐
                               </span>
                               <button className="btn btn-outline-danger border-0">
                                 ❤️
                               </button>
                             </div>
                             <h5 className="mt-2" onClick={navaction} id="2">{restaurant.name}</h5>
                            
                             <p className="text-muted" onClick={navaction} id="2">
                               {restaurant.deliveryTime} • {restaurant.priceForTwo}
                             </p>
                             <p className="text-danger fw-bold">{restaurant.address}</p>
                           </div>
                         </div>
                       </div>
                    ))}
                </div>
            </div>
            <div className="container-fluid bg bg-dark pt-3 mt-5">
              <div className="row justify-content-center">
                    <div className="col-sm-4 text-center">
                      <p className='text text-light'>© 2025 Foodies. All Rights Reserved. </p>
                    </div>
              </div>
            </div>
    </div>
  );
}
