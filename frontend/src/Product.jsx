import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./apiPath.js";
export default function Product({ searchQuery }) {
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState({}); 
  const [selectedProduct, setSelectedProduct] = useState(null); 

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const filteredData = data.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function addToCart(product) {
    const user = JSON.parse(localStorage.getItem("userId"));
    if (!user) {
      alert("Before adding to cart, please log in first.");
      return;
    }

    if (selectedProduct === product._id) {
      const productId = product._id;
      const type=2;
      const userId = user;
      const price = product.price;
      const restaurant = product.cuisine;
      const name = product.name;
      const address = product.address || "Unknown";
      const quantity = quantities[productId] || 1;
      const image = product.image;

      axios
        .post(`${API_URL}/api/order`, {
          productId,
          userId,
          type,
          name,
          image,
          price,
          restaurant,
          address,
          quantity,
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
      setQuantities((prev) => ({ ...prev, [product._id]: 1 })); 
    }
  }

  const increment = (productId) => {
    setQuantities((prev) => ({ ...prev, [productId]: (prev[productId] || 1) + 1 }));
  };

  const decrement = (productId) => {
    if (quantities[productId] > 1) {
      setQuantities((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Products</h1>
      <div className="row justify-content-center">
        {filteredData.length > 0 ? (
          filteredData.map((restaurant) => (
            <div key={restaurant._id} className="col-md-3 rounded" id="effecthm">
              <div className="card shadow-sm p-3 mb-4 text-center">
                <img
                  style={{width:"100%",height:"200px"}}
                  src={restaurant.image}
                  className="card-img-top rounded text-center"
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
                  <p className="text-muted">{restaurant.deliveryTime} • ${restaurant.price}</p>
                  <p className="text-danger fw-bold">{restaurant.discount}</p>

                  {selectedProduct === restaurant._id && (
                    <div className="d-flex justify-content-center align-items-center my-2">
                      <button className="btn btn-outline-dark" onClick={() => decrement(restaurant._id)}>
                        -
                      </button>
                      <span className="mx-2">{quantities[restaurant._id] || 1}</span>
                      <button className="btn btn-outline-dark" onClick={() => increment(restaurant._id)}>
                        +
                      </button>
                    </div>
                  )}
                </div>

                <button className="btn btn-dark w-100" onClick={() => addToCart(restaurant)}>
                  {selectedProduct === restaurant._id ? "Confirm & Add to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </div>
  );
}
