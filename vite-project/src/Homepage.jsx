import React, { useState } from 'react';
import "./Style.css";
import { Navigate } from "react-router-dom";

export default function Homepage() {
    const [signin, setsign] = useState(false);
    const [navchoice,setnav] = useState(0);
    function opensignin() {
        setsign(true);
    }
    function navaction(Event){
      setnav(parseInt(Event.target.id))
    }
    const [data2,setdata2] = useState([
      {
        rating: 3.9,
        name: "Perfect Maggi",
        cuisine: ["Snacks", "Beverages"],
        deliveryTime: "25 MINS",
        priceForTwo: "Rs 150 FOR TWO",
        offer: "60% off | Use WELCOMEBACK"
      },
      {
        rating: 3.9,
        name: "Perfect Maggi",
        cuisine: ["Snacks", "Beverages"],
        deliveryTime: "25 MINS",
        priceForTwo: "Rs 150 FOR TWO",
        offer: "60% off | Use WELCOMEBACK"
      },
      {
        rating: 3.9,
        name: "Perfect Maggi",
        cuisine: ["Snacks", "Beverages"],
        deliveryTime: "25 MINS",
        priceForTwo: "Rs 150 FOR TWO",
        offer: "60% off | Use WELCOMEBACK"
      },
      {
        rating: 3.9,
        name: "Perfect Maggi",
        cuisine: ["Snacks", "Beverages"],
        deliveryTime: "25 MINS",
        priceForTwo: "Rs 150 FOR TWO",
        offer: "60% off | Use WELCOMEBACK"
      }
    ]);
    const [data, setdata] = useState([
        { name: "Burger", count: 20 },
        { name: "Biryani", count: 20 },
        { name: "Chinese", count: 20 },
        { name: "Cakes", count: 20 },
        { name: "Pizza", count: 20 }
    ]);

    return (
        <div className='bg bg-light'>
           
            <div className="container-fluid bg bg-dark">
                <div className="row">
                    <div className="col-sm-3 text-center p-4">
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-1">
                                <img id="logo" className='text-center' src="logo.png" alt="Logo" />
                            </div>
                            <div className="col-sm-5">
                                <h4 className='text text-light mt-2 ms-3'>Foodies</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6 p-4">
                        <button id="0" onClick={navaction} className='btn btn-dark m-2'>Home</button>
                        <button id="1" onClick={navaction} className='btn btn-dark m-2'>Shop</button>
                        <button id="2" onClick={navaction} className='btn btn-dark m-2'>Product</button>
                        <button id="3" onClick={navaction} className='btn btn-dark m-2'>About Us</button>
                        <button className='btn btn-dark ps-3 pe-3 ms-4' id="signin" onClick={opensignin}>Sign In</button>
                    </div>
                      { navchoice>0 ? <Navigate to="/product" replace state={{ choice:{navchoice} }} /> : ""}
                    {signin && <Navigate to="/signin" replace={true} />}
                </div>
            </div>

            <div className="container bg bg-light pt-5">
                <div className="row">
                    <div className="col-sm-5 border border-grey rounded" id="effecthm">
                        <div className="row">
                            <div className="col-sm-12" id="img-home">
                                <img className='rounded' id="img-home" src="online-home.jpg" alt="Order Online" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 text-center mt-2">
                                <h5>Order Online</h5>
                                <p>Stay home and order to your doorstep</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2"></div>
                    <div className="col-sm-5 border border-grey rounded" id="effecthm">
                        <div className="row">
                            <div className="col-sm-12" id="img-home">
                                <img className='rounded' id="img-home" src="Dining-home.jpg" alt="Dining" />
                            </div>
                        </div>
                        <div className="row">
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
                <div className="row">
                    {data.map((item, index) => (
                        <div className="col-sm-2 border border-grey m-3 text-center" id='collections' key={index}>
                            <div className="row justify-content-center">
                                <div className="col-sm-8">
                                    <img src="collection-img.png" id="imgs" alt={item.name} />
                                </div>
                            </div>
                            <div className="row">
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
                         <div key={index} className="col-md-3 rounded " id="effecthm">
                         <div className="card shadow-sm p-3 mb-4">
                           <img
                             src="collection-img.png" 
                             className="card-img-top rounded"
                             alt={restaurant.name}
                             id="imgss"
                           />
                           <div className="card-body">
                             <div className="d-flex justify-content-between align-items-center">
                               <span className="badge bg-success text-white p-2">
                                 {restaurant.rating} ⭐
                               </span>
                               <button className="btn btn-outline-danger border-0">
                                 ❤️
                               </button>
                             </div>
                             <h5 className="mt-2">{restaurant.name}</h5>
                             <p className="text-muted">{restaurant.cuisine.join(", ")}</p>
                             <p className="text-muted">
                               {restaurant.deliveryTime} • {restaurant.priceForTwo}
                             </p>
                             <p className="text-danger fw-bold">{restaurant.offer}</p>
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
