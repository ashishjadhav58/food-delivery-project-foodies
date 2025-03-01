import React, { useState, useEffect } from "react";

export default function Shop() {
  const [shop, setShop] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/restaurants") // Replace with your backend API URL
      .then((response) => {
        setShop(response.data); // Store the fetched data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching shop data:", error);
        setError("Failed to load shop data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-4">{error}</div>;

  return (
    <div className="container">
      <h2 className="my-3">Shop</h2>
      <div className="row justify-content-center">
        {shop.map((product) => (
          <div key={product.id} className="col-md-3 m-4" id="effecthm">
            <div className="card shadow-sm">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body text-center">
                <h5>{product.name}</h5>
                <p className="text-muted">{product.address}</p>
                <p className="text-muted">{product.contact}</p>
                <p className="text-muted">{product.openingHours}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
