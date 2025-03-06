import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Shop({ searchQuery }) {
  const navigate = useNavigate();
  const [shop, setShop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({}); // Store quantity per product
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/restaurants")
      .then((response) => {
        setShop(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching shop data:", error);
        setError("Failed to load shop data.");
        setLoading(false);
      });
  }, []);

  function addcart(product) {
    const user = JSON.parse(localStorage.getItem("userId"));
    if (!user) {
      alert("Before adding into cart, please log in first.");
      return;
    }

    if (selectedProduct === product._id) {
      const productId = product._id;
      const userId = user;
      const name = product.name;
      const quantity = quantities[productId] || 1;
      const address = product.address;
      const type = "1";
      const image = product.image;
      axios
        .post("http://localhost:3000/api/order", {
          productId,
          userId,
          name,
          quantity,
          type,
          image,
          address,
        })
        .then((response) => {
          console.log("Added to cart:", response.data);
          setSelectedProduct(null); 
          setQuantities((prev) => ({ ...prev, [productId]: 1 })); 
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    } else {
      setSelectedProduct(product._id); 
      setQuantities((prev) => ({ ...prev, [product._id]: 1 }));    }
  }

  const increment = (productId) => {
    setQuantities((prev) => ({ ...prev, [productId]: (prev[productId] || 1) + 1 }));
  };

  const decrement = (productId) => {
    if (quantities[productId] > 1) {
      setQuantities((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));
    }
  };

  const filteredShop = shop.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-4">{error}</div>;

  return (
    <div className="container">
      <h2 className="my-3">Hotels</h2>
      <div className="row justify-content-center">
        {filteredShop.length > 0 ? (
          filteredShop.map((product) => (
            <div key={product._id} className="col-md-3 m-4" id="effecthm">
              <div className="card shadow-sm">
                <img
                  style={{width:"100%", height:"200px"}}
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

                {selectedProduct === product._id && (
                  <div className="d-flex justify-content-center align-items-center my-2">
                    <button className="btn btn-outline-dark" onClick={() => decrement(product._id)}>
                      -
                    </button>
                    <span className="mx-2">{quantities[product._id] || 1}</span>
                    <button className="btn btn-outline-dark" onClick={() => increment(product._id)}>
                      +
                    </button>
                  </div>
                )}

                <button className="btn btn-dark w-100" onClick={() => addcart(product)}>
                  {selectedProduct === product._id ? "Confirm & Add to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No matching hotels found.</p>
        )}
      </div>
    </div>
  );
}