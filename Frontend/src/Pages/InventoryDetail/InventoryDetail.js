import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InventoryDetail.css";
import { useNavigate, useParams } from "react-router-dom";

const InventoryDetail = () => {
  const { id } = useParams(); //useParams hook to access route parameters
  const [inventoryData, setInventoryData] = useState({});
    const [newQuantity, setNewQuantity] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const navigate = useNavigate()

  useEffect(() => {
    // Fetch inventory data from the server
    axios
      .get(`http://localhost:4000/single-inventory/${id}`)
      .then((response) => {
        setInventoryData(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });
  }, [id]);

  const handleQuantityUpdate = () => {
    axios
      .put(`http://localhost:4000/update-quantity/${id}`, {
        quantity: newQuantity,
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
      alert("Quantity updated succesfuly");
      navigate("/");
  };
  
  const handlePriceUpdate = () => {
    axios
      .put(`http://localhost:4000/update-price/${id}`, {
        selling_price: newPrice,
      })

      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
      alert("Price updated succesfuly");
    navigate('/');
  };
  console.log(newQuantity);
    console.log(newPrice);
  return (
    <div className="inventory-detail-container">
      <h2 className="detail-heading">Inventory Details</h2>
      <div className="inventory-detail">
        <h3 className="inventory-name">
          Inventory Name: {inventoryData.inventory_name}
        </h3>
        <p className="inventory-info">Quantity: {inventoryData.quantity}</p>
        <p className="inventory-info">
          Purchasing Price: {inventoryData.purchasing_price}
        </p>
        <p className="inventory-info">
          Selling Price: {inventoryData.selling_price}
        </p>
        <p className="inventory-info">ID: {inventoryData.post_id}</p>
        <p className="inventory-info">
          Added Date:
          {new Date(inventoryData.inventory_added_date).toLocaleDateString()}
        </p>
      </div>
      <p className="inventory-info">Quantity: {inventoryData.quantity}</p>

      {/* New Quantity Updater */}
      <div className="quantity-updater">
        <label htmlFor="newQuantity">Set New Quantity:</label>
        <input
          type="number"
          id="newQuantity"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
        />
        <button onClick={handleQuantityUpdate}>Update Quantity</button>
      </div>

      <p className="inventory-info">
      Selling Price: {inventoryData.selling_price}
      </p>

      {/* New price Updater */}
      <div className="quantity-updater">
        <label htmlFor="newPrice">Set New price:</label>
        <input
          type="number"
          id="newPrice"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <button onClick={handlePriceUpdate}>Update Price</button>
      </div>
    </div>
  );
};

export default InventoryDetail;
