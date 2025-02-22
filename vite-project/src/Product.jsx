import React, { useState } from 'react';

export default function Product() {
  const [data, setData] = useState([
    {
      name: "Perfect Maggi",
      cuisine: "Snacks, Beverages",
      rating: 3.9,
      deliveryTime: "25 MINS",
      priceForTwo: "$15 FOR TWO",
      discount: "60% off | Use WELCOMEBACK",
      image: "collection-img.png",
    },
    {
        name: "Perfect Maggi",
        cuisine: "Snacks, Beverages",
        rating: 3.9,
        deliveryTime: "25 MINS",
        priceForTwo: "$15 FOR TWO",
        discount: "60% off | Use WELCOMEBACK",
        image: "collection-img.png",
      },
      {
        name: "Perfect Maggi",
        cuisine: "Snacks, Beverages",
        rating: 3.9,
        deliveryTime: "25 MINS",
        priceForTwo: "$15 FOR TWO",
        discount: "60% off | Use WELCOMEBACK",
        image: "collection-img.png",
      },
      {
        name: "Perfect Maggi",
        cuisine: "Snacks, Beverages",
        rating: 3.9,
        deliveryTime: "25 MINS",
        priceForTwo: "$15 FOR TWO",
        discount: "60% off | Use WELCOMEBACK",
        image: "collection-img.png",
      },
      {
        name: "Perfect Maggi",
        cuisine: "Snacks, Beverages",
        rating: 3.9,
        deliveryTime: "25 MINS",
        priceForTwo: "$15 FOR TWO",
        discount: "60% off | Use WELCOMEBACK",
        image: "collection-img.png",
      },
      {
        name: "Perfect Maggi",
        cuisine: "Snacks, Beverages",
        rating: 3.9,
        deliveryTime: "25 MINS",
        priceForTwo: "$15 FOR TWO",
        discount: "60% off | Use WELCOMEBACK",
        image: "collection-img.png",
      },
      {
        name: "Perfect Maggi",
        cuisine: "Snacks, Beverages",
        rating: 3.9,
        deliveryTime: "25 MINS",
        priceForTwo: "$15 FOR TWO",
        discount: "60% off | Use WELCOMEBACK",
        image: "collection-img.png",
      },
      {
        name: "Perfect Maggi",
        cuisine: "Snacks, Beverages",
        rating: 3.9,
        deliveryTime: "25 MINS",
        priceForTwo: "$15 FOR TWO",
        discount: "60% off | Use WELCOMEBACK",
        image: "collection-img.png",
      },
      {
        name: "Perfect Maggi",
        cuisine: "Snacks, Beverages",
        rating: 3.9,
        deliveryTime: "25 MINS",
        priceForTwo: "$15 FOR TWO",
        discount: "60% off | Use WELCOMEBACK",
        image: "collection-img.png",
      },
      {
        name: "Perfect Maggi",
        cuisine: "Snacks, Beverages",
        rating: 3.9,
        deliveryTime: "25 MINS",
        priceForTwo: "$15 FOR TWO",
        discount: "60% off | Use WELCOMEBACK",
        image: "collection-img.png",
      }
  ]);

  return (
    <div className="container mt-5">
        <h1 className='mb-4'>Products</h1>
      <div className="row justify-content-center">
        {data.map((restaurant, index) => (
          <div key={index} className="col-md-3 rounded" id="effecthm">
            <div className="card shadow-sm p-3 mb-4">
              <img
                src={restaurant.image} 
                className="card-img-top rounded"
                alt={restaurant.name}
                id="imgss"
              />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-success text-white p-2">
                    {restaurant.rating} ⭐
                  </span>
                  <button className="btn btn-outline-danger border-0">❤️</button>
                </div>
                <h5 className="mt-2">{restaurant.name}</h5>
                <p className="text-muted">{restaurant.cuisine}</p> 
                <p className="text-muted">
                  {restaurant.deliveryTime} • {restaurant.priceForTwo}
                </p>
                <p className="text-danger fw-bold">{restaurant.discount}</p> 
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
