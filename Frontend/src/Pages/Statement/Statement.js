import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Statement.css"; 

const StatementData = () => {
  const [statementData, setStatementData] = useState([]);

  useEffect(() => {
    // Fetch statement data from the server
    axios
      .get("http://localhost:4000/statement-data")
      .then((response) => {
        setStatementData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching statement data:", error);
      });
  }, []);

  return (
    <div className="statement-data-container">
      <h2>Statement Data</h2>
      <table className="statement-table">
        <thead>
          <tr>
            <th>Sale ID</th>
            <th>Inventory Name</th>
            <th>Customer First Name</th>
            <th>Customer Last Name</th>
            <th>Payment Type</th>
            <th>Selling Price</th>
            <th>Sold Quantity</th>
            <th>Total</th>
            <th>Sales Date</th>
          </tr>
        </thead>
        <tbody>
          {statementData.map((item) => (
            <tr key={item.sale_id}>
              <td>{item.sale_id}</td>
              <td>{item.inventory_name}</td>
              <td>{item.customer_first_name}</td>
              <td>{item.customer_last_name}</td>
              <td>{item.payment_type}</td>
              <td>${item.selling_price}</td>
              <td>{item.sold_quantity}</td>
              <td>${item.total}</td>
              <td>{new Date(item.sales_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatementData;
