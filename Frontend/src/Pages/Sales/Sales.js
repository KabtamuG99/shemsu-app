import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sales.css";
import Receipt from "../Recipt/Receipt";
import { useNavigate, useParams } from "react-router-dom";

function Sales() {
  const { id } = useParams();
  const [inventoryData, setInventoryData] = useState({});
  const [customerData, setCustomerData] = useState({
    customer_first_name: "",
    customer_last_name: "",
    payment_type: "cash",
    sold_quantity: 0, // Default value
  });
  console.log(customerData);
  const [quantityError, setQuantityError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/single-inventory/${id}`)
      .then((response) => {
        setInventoryData(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset the quantityError when sold_quantity changes
    if (name === "sold_quantity") {
      setQuantityError("");
    }
  };


 const handleFormSubmit = async (e) => {
   e.preventDefault();

   if (customerData.sold_quantity > inventoryData.quantity) {
     setQuantityError(
       "Required Quantity has to be less than available quantity"
     );
     return;
   }

   const {
     customer_first_name,
     customer_last_name,
     payment_type,
     sold_quantity,
   } = customerData;
   const { inventory_id, inventory_name, selling_price } = inventoryData;

   // Calculate the total
   let saleData=""
   const total = selling_price * sold_quantity;

   // Check payment_type and adjust the total accordingly
   if (payment_type === "on_account") {
     // Add a negative total for on_account sales
     const remaining_balance = total;
     saleData = {
       customer_first_name,
       customer_last_name,
       payment_type,
       sold_quantity,
       inventory_id,
       inventory_name,
       selling_price,
       total,
       remaining_balance,
     };
   } else {
     saleData = {
       customer_first_name,
       customer_last_name,
       payment_type,
       sold_quantity,
       inventory_id,
       inventory_name,
       selling_price,
       total,
     };
   }

   const updatedQuantity = inventoryData.quantity - sold_quantity;
   console.log(updatedQuantity);

   try {
     await axios.post("http://localhost:4000/sales-data", saleData);

     await axios.put(`http://localhost:4000/update-quantity/${id}`, {
       quantity: updatedQuantity,
     });

     navigate("/Receipt", { state: { saleData } }); // Pass saleData as state
   } catch (error) {
     console.error("Error submitting sale data:", error);
   }
 };

  return (
    <div className="inventory-detail-container">
      <h2 className="detail-heading">Sales Item</h2>
      <div className="inventory-detail">
        <h3 className="inventory-name">
          Product Name: {inventoryData.inventory_name}
        </h3>
        <p className="inventory-info">
          Available Quantity: {inventoryData.quantity}
        </p>
        <p className="inventory-info">
          Selling Price: {inventoryData.selling_price}
        </p>
        <p className="inventory-info">ID: {inventoryData.post_id}</p>
      </div>

      {/* Customer Sales Form */}
      <form className="customer-sales-form" onSubmit={handleFormSubmit}>
        <label htmlFor="customerFirstName">First Name:</label>
        <input
          type="text"
          id="customerFirstName"
          name="customer_first_name"
          value={customerData.customer_first_name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="customerLastName">Last Name:</label>
        <input
          type="text"
          id="customerLastName"
          name="customer_last_name"
          value={customerData.customer_last_name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="paymentType">Payment Type:</label>
        <select
          id="paymentType"
          name="payment_type"
          value={customerData.payment_type}
          onChange={handleInputChange}
        >
          <option value="cash">Cash</option>
          <option value="on_account">On Account</option>
        </select>

        {/* Sold Quantity Input with Error Message */}
        <div className="sold-quantity-input">
          <label htmlFor="soldQuantity">Sold Quantity:</label>
          <input
            type="number"
            id="soldQuantity"
            name="sold_quantity"
            value={customerData.sold_quantity}
            onChange={handleInputChange}
            required
          />
          {quantityError && <p className="quantity-error">{quantityError}</p>}
        </div>
        <div className="sold-quantity-input">
          <label className="soldQuantity">   
            Total: {inventoryData.selling_price * customerData.sold_quantity}
          </label>
        </div>
    

        <button type="submit">Submit Sale</button>
      </form>
    </div>
  );
}

export default Sales;
