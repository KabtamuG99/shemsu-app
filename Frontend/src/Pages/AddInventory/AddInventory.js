import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Addinventory.css"

function AddInventory() {
  const [inventoryData, setInventoryData] = useState({
    inventory_name: "",
    quantity: 0,
    inventory_price: 0,
    post_id: "",
  });
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInventoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/add-inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inventoryData),
      });

      if (response.ok) {
        alert("Inventory added successfully!");
        navigate("/");
      } else {
        alert("Failed to add inventory.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  }

  return (
    <div className="add-inventory-container">
      <h2>Add Inventory</h2>
      <form className="inventory-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Inventory Name:</label>
          <input
            type="text"
            name="inventory_name"
            value={inventoryData.inventory_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={inventoryData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Inventory Price:</label>
          <input
            type="number"
            name="inventory_price"
            value={inventoryData.inventory_price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Post ID:</label>
          <input
            type="text"
            name="post_id"
            value={inventoryData.post_id}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          Add Inventory
        </button>
      </form>
    </div>
  );
}

export default AddInventory