import React, { useState } from 'react';

export default function DiningSection() {
    const name = JSON.parse(localStorage.getItem("BsName"))
    const [formData, setFormData] = useState({
        restaurantName: name,
        discount: "",
        availableSeats: "",
        openingTime: "",
        closingTime: ""
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Dining Section Data:", formData);
        alert("Dining details updated successfully!");
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1 className='text-center mt-3 mb-3'>Dining Section</h1>
                <div className="col-sm-5 bg bg-danger text-center pt-3 pb-3 text-light rounded">
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="restaurantName"
                            className='form-control mb-3 text-center' 
                            placeholder='Enter Restaurant Name' 
                            value={formData.restaurantName} 
                            onChange={handleChange}
                            required
                        />
                        
                        <input 
                            type="number" 
                            name="discount"
                            className='form-control mb-3 text-center' 
                            placeholder='Enter Discount (%)' 
                            value={formData.discount} 
                            onChange={handleChange}
                            required
                        />
                        
                        <input 
                            type="number" 
                            name="availableSeats"
                            className='form-control mb-3 text-center' 
                            placeholder='Enter Available Seats' 
                            value={formData.availableSeats} 
                            onChange={handleChange}
                            required
                        />
                        
                        <label className="text-light">Opening Time:</label>
                        <input 
                            type="time" 
                            name="openingTime"
                            className='form-control mb-3 text-center' 
                            value={formData.openingTime} 
                            onChange={handleChange}
                            required
                        />
                        
                        <label className="text-light">Closing Time:</label>
                        <input 
                            type="time" 
                            name="closingTime"
                            className='form-control mb-3 text-center' 
                            value={formData.closingTime} 
                            onChange={handleChange}
                            required
                        />
                        
                        <input 
                            type="submit" 
                            className='btn btn-light' 
                            value="MODIFY" 
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
