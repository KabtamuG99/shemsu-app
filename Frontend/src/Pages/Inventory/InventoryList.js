import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./invetoryList.css";


const InventoryList = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    // Fetch inventory data from the server
    axios
      .get("http://localhost:4000/all-inventory")
      .then((response) => {
        setInventoryData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });
  }, []);

  return (
    <div className="inventory-list-container">
      <h2>Inventory On hand</h2>
      <ul className="inventory-list">
        {inventoryData?.map((item) => (
          <li key={item.inventory_id} className="inventory-item">
            <h3>{item.inventory_name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.inventory_price}</p>
            <p>
              Added Date:
              {new Date(item.inventory_added_date).toLocaleDateString()}
            </p>
            <Link
              to={`/single-inventory/${item.post_id}`}
              className="view-details-link"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
