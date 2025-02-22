import React, { useState } from 'react';

export default function Shop() {
  const [shop, setshop] = useState([
        {
          id: 1,
          name: "Downtown Food Plaza",
          address: "123 Main Street, Downtown, NY",
          contact: "+1 234 567 890",
          openingHours: "9:00 AM - 10:00 PM",
          rating: 4.5,
          latitude: 40.7128,
          longitude: -74.0060,
        },
        {
          id: 2,
          name: "City Mall Food Court",
          address: "456 Market Lane, City Mall, LA",
          contact: "+1 987 654 321",
          openingHours: "10:00 AM - 11:00 PM",
          rating: 4.2,
          latitude: 34.0522,
          longitude: -118.2437,
        },
        {
          id: 3,
          name: "Greenwich Bistro",
          address: "789 Park Avenue, Greenwich, CT",
          contact: "+1 543 210 987",
          openingHours: "8:00 AM - 9:00 PM",
          rating: 4.7,
          latitude: 41.0262,
          longitude: -73.6282,
        },
        {
          id: 4,
          name: "Ocean View Café",
          address: "321 Beach Road, Miami, FL",
          contact: "+1 321 654 987",
          openingHours: "7:00 AM - 10:00 PM",
          rating: 4.8,
          latitude: 25.7617,
          longitude: -80.1918,
        },
        {
          id: 5,
          name: "Mountain Top Eatery",
          address: "567 Hill Street, Denver, CO",
          contact: "+1 678 543 210",
          openingHours: "9:00 AM - 8:00 PM",
          rating: 4.6,
          latitude: 39.7392,
          longitude: -104.9903,
        },
        {
          id: 6,
          name: "Mountain Top Eatery",
          address: "567 Hill Street, Denver, CO",
          contact: "+1 678 543 210",
          openingHours: "9:00 AM - 8:00 PM",
          rating: 4.6,
          latitude: 39.7392,
          longitude: -104.9903,
        },
        {
          id: 7,
          name: "Mountain Top Eatery",
          address: "567 Hill Street, Denver, CO",
          contact: "+1 678 543 210",
          openingHours: "9:00 AM - 8:00 PM",
          rating: 4.6,
          latitude: 39.7392,
          longitude: -104.9903,
        },
        {
          id: 8,
          name: "Mountain Top Eatery",
          address: "567 Hill Street, Denver, CO",
          contact: "+1 678 543 210",
          openingHours: "9:00 AM - 8:00 PM",
          rating: 4.6,
          latitude: 39.7392,
          longitude: -104.9903,
        }      
  ]);

  return (
    <div className="container">
      <h2 className="my-3">Shop</h2>
      <div className="row justify-content-center">
        {shop.map((product) => (
          <div key={product.id} className="col-md-3 m-4" id="effecthm">
            <div className="card shadow-sm">
              <img src="collection-img.png" className="card-img-top" alt={product.name} />
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
