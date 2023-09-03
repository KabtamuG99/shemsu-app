import React from "react";
import { useLocation } from "react-router-dom";
import "./Receipt.css"; // Import your custom CSS for styling
import printJS from "print-js";

function Receipt() {
  const location = useLocation();
  const { state } = location;
  const saleData = state?.saleData;

  if (!saleData) {
    return <div className="receipt-container">No sale data available.</div>;
  }

  const totalPrice = saleData.selling_price * saleData.sold_quantity;

  // Function to trigger the print dialog
   const handlePrint = () => {
     printJS({
       printable: "receipt-content", // The ID or class of the element to print
       type: "html",
     });
   };

  return (
    <div className="receipt-container">
      <h1>Shemsu Mart</h1>
      <h2>Receipt</h2>
      <div className="receipt-content" id="receipt-content">
        <div className="receipt-content">
          <h3>Thank you for shopping !!</h3>
          <p>
            <strong>Customer Name:</strong> {saleData.customer_first_name}
            {saleData.customer_last_name}
          </p>
          <p>
            <strong>Payment Type:</strong> {saleData.payment_type}
          </p>
          <p>
            <strong>Item:</strong> {saleData.sold_quantity}
          </p>
          <p>
            <strong>Product Name:</strong> {saleData.inventory_name}
          </p>
          <p>
            <strong>Unit Price:</strong> ${saleData.selling_price}
          </p>
          <p>
            <strong>Total Price:</strong> ${totalPrice}
          </p>
        </div>
        {/* Print Button */}
        <button onClick={handlePrint} className="print-button">
          Print Receipt
        </button>
      </div>
    </div>
  );
}

export default Receipt;
