import React, { useEffect, useState } from "react";

export default function Product() {
  const [data, setData] = useState([]); // ✅ Change from {} to []

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        setData(res.data); // ✅ Ensure API returns an array
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getdata();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Products</h1>
      <div className="row justify-content-center">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((restaurant, index) => (
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
          ))
        ) : (
          <p>Loading products...</p> // ✅ Added loading message
        )}
      </div>
    </div>
  );
}
