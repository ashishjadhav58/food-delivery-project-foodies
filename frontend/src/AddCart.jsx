import React, { useEffect, useState } from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import { API_URL } from "./apiPath.js"
import { Star } from "lucide-react";
export default function AddCart() {
    const navigate = useNavigate();
  const [data, setData] = useState([]); // for food data
  const [data2, setData2] = useState([]); // for dining data
  const [data3, setData3] = useState([]); // for dining data
  const user = JSON.parse(localStorage.getItem("userId"));
  const [ch, setCh] = useState(0); // Controls which section (Food, Dining, Back, History) to display
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track any error in the requests
  const [orderError, setOrderError] = useState(null); // For order errors
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const foodTotal = data.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Fetch food data on mount
  useEffect(() => {
    const getFoodData = async () => {
      setLoading(true);
      setError(null); // Reset error on each fetch attempt
      try {
        const response = await axios.get(`${API_URL}/api/order/addcart/food/${user}`);
        setData(response.data); // Store food data
      } catch (err) {
        setError("Error fetching food data. Please try again.");
        console.error("Error fetching food data:", err);
      } finally {
        setLoading(false); // Turn off loading after request
      }
    };
    getFoodData();
  }, [user]);

  // Fetch dining data on mount
  useEffect(() => {
    const getDiningData = async () => {
      setLoading(true);
      setError(null); // Reset error on each fetch attempt
      try {
        const response = await axios.get(`${API_URL}/api/order/addcart/dining/${user}`);
        setData2(response.data); // Store dining data
      } catch (err) {
        setError("Error fetching dining data. Please try again.");
        console.error("Error fetching dining data:", err);
      } finally {
        setLoading(false); // Turn off loading after request
      }
    };
    getDiningData();
  }, [user]);

  useEffect(() => {
    const getHistoryData = async () => {
      setLoading(true);
      setError(null); // Reset error on each fetch attempt
      try {
        const response = await axios.get(`${API_URL}/api/order/history/${user}`);
        setData3(response.data); // Store dining data
      } catch (err) {
        setError("Error fetching dining data. Please try again.");
        console.error("Error fetching dining data:", err);
      } finally {
        setLoading(false); // Turn off loading after request
      }
    };
    getHistoryData();
  }, [user]);

  // Handle Cancel (Optimistic UI update)
  const handleCancel = async (id) => {
    const updatedData = data.filter((order) => order._id !== id); // Optimistic update
    setData(updatedData);

    try {
      await axios.delete(`${API_URL}/api/order/addcart/food/delete/${id}`);
    } catch (err) {
      console.error("Error deleting item:", err);
      setError("An error occurred while deleting the item. Please try again.");
      setData(data); // Rollback if there's an error
    }
  };

  const handleCancel2 = async (id) => {
    const updatedData = data2.filter((order) => order._id !== id); // Optimistic update
    setData2(updatedData);

    try {
      await axios.delete(`${API_URL}/api/order/addcart/dining/delete/${id}`);
    } catch (err) {
      console.error("Error deleting item:", err);
      setError("An error occurred while deleting the item. Please try again.");
      setData2(data); // Rollback if there's an error
    }
  };

  // Function to handle the orders
  // Open the modal using Bootstrap JavaScript
  const handleRateOrder = (order) => {
    setSelectedOrder(order);
    setRating(0); // Reset rating
    const modal = new bootstrap.Modal(document.getElementById("ratingModal"));
    modal.show();
  };

  const submitRating = async () => {
    try {
      await axios.post(`${API_URL}/api/order/rate/${selectedOrder._id}`, { rating });
      alert(`Thanks for rating ${rating} stars!`);
      const modal = bootstrap.Modal.getInstance(document.getElementById("ratingModal"));
      modal.hide();
    } catch (err) {
      console.error("Error submitting rating:", err);
      setError("Error submitting rating. Try again.");
    }
  };

  return (
    <div>
      <h1 className='text-center text text-primary'>ORDER CART</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-4 text-center mt-4">
            <button className='btn btn-outline-primary mx-2' onClick={() => setCh(0)}>Food</button>
            <button className='btn btn-outline-primary mx-2' onClick={() => setCh(1)}>Dining</button>
            <button className='btn btn-outline-primary mx-2' onClick={() => setCh(2)}>Back</button>
            <button className='btn btn-outline-primary mx-2' onClick={() => setCh(3)}>History</button>
          </div>
        </div>
      </div>

      {loading && <div className="text-center">Loading...</div>} {/* Display loading indicator */}
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
      {orderError && <div className="alert alert-danger">{orderError}</div>} {/* Display order error */}

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-10">
            {ch === 0 && (
              <div>
                <h3 className='text-center mt-4'>Food Items</h3>
                {data.length > 0 ? (
                  <>
                    <table className="table">
                      <thead>
                        <tr>
                          <th className='text-center'></th>
                          <th className='text-center'>Name</th>
                          <th className='text-center'>Price</th>
                          <th className='text-center'>Qty</th>
                          <th className='text-center'>Total</th>
                          <th className='text-center'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item) => (
                          <tr key={item._id}>
                            <td className='text-center'><img src={item.image} alt={item.name} width="50" height="50" /></td>
                            <td className='text-center'>{item.name}</td>
                            <td className='text-center'>Rs. {item.price}</td>
                            <td className='text-center'>{item.quantity}</td>
                            <td className='text-center'>Rs. {item.price * item.quantity}</td>
                            <td className='text-center'>
                              <button className="btn btn-danger" onClick={() => handleCancel(item._id)}>Cancel</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="row mt-5 text-center">
                      <h4>Total Bill</h4>
                      <p>Food Price : Rs {foodTotal}</p>
                      <p>Tax 18% : Rs {(foodTotal * 0.18).toFixed(2)}</p>
                      <h6>Total price : Rs {(foodTotal + (foodTotal * 0.18)).toFixed(2)}</h6>
                    </div>
                    <div className="row text-center mt-4">
                      <button className='btn btn-primary' onClick={() => handleOrder(data)} disabled={loading}>
                        {loading ? "Processing..." : <b>ORDER</b>}
                      </button>
                    </div>
                  </>
                ) : (
                  <p className='text-center'>No food items found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-10">
            {ch === 1 && (
              <div>
                <h3 className='text-center mt-4'>Dining</h3>
                {data2.length > 0 ? (
                  <>
                    <table className="table">
                      <thead>
                        <tr>
                          <th></th>
                          <th className='text-center'>Hotel Name</th>
                          <th className='text-center'>Qty</th>
                          <th className='text-center'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data2.map((item) => (
                          <tr key={item._id}>
                            <td className='text-center'><img src={item.image} alt={item.name} width="50" height="50" /></td>
                            <td className='text-center'>{item.name}</td>
                            <td className='text-center'>{item.quantity}</td>
                            <td className='text-center'>
                              <button className="btn btn-danger" onClick={() => handleCancel2(item._id)}>Cancel</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="row text-center mt-4">
                      <button className='btn btn-primary' onClick={() => handleOrder(data2)} disabled={loading}>
                        {loading ? "Processing..." : <b>BOOK</b>}
                      </button>
                    </div>
                  </>
                ) : (
                  <p className='text-center'>No Dining records found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {ch === 2 && <Navigate to="/" />}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-10">
            {ch === 3 && (
              <div>
                <h3 className='text-center mt-4'>History</h3>
                {data3.length > 0 ? (
                  <>
                    <table className="table">
                      <thead>
                        <tr>
                          <th></th>
                          <th className='text-center'>Hotel Name</th>
                          <th className='text-center'>Price</th>
                          <th className='text-center'>Qty</th>
                          <th className='text-center'>Total</th>
                          <th className='text-center'>Status</th>
                          <th className='text-center'>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data3.slice().reverse().map((item) => (
                          <tr key={item._id}>
                            <td className='text-center'><img src={item.image} alt={item.name} width="50" height="50" /></td>
                            <td className='text-center'>{item.name}</td>
                            <td className='text-center'>{item.price ? item.price:"Booking"}</td>
                            <td className='text-center'>{item.quantity}</td>
                            <td className='text-center'>{item.price ? item.quantity * item.price :"Booking"}</td>
                            <td className='text-center'>Success</td>
                            <td className='text-center'>{new Date(item.createdAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <p className='text-center'>No Dining records found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="modal fade" id="ratingModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Rate Your Order</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body text-center">
              <div className="d-flex justify-content-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className={`cursor-pointer mx-1 ${i < rating ? "text-warning" : "text-secondary"}`}
                  />
                ))}
              </div>
              <p className="mt-2">You rated: {rating} Stars</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={submitRating}>Submit Rating</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
