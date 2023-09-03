import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Receivable = () => {
  const [receivableData, setReceivableData] = useState([]);
  useEffect(() => {
    // Fetch statement data from the server
    axios
      .get("http://localhost:4000/receivables")
      .then((response) => {
        setReceivableData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching statement data:", error);
      });
  }, []);

  return (
    <div className="statement-data-container">
      <h2>Receibables</h2>
      <table className="statement-table">
        <thead>
          <tr>
            <th>Sale ID</th>
            <th>Inventory Name</th>
            <th>Customer First Name</th>
            <th>Customer Last Name</th>
            <th>Payment Type</th>
            <th>Total</th>
            <th>Remaining-Balance</th>
            <th>Sales Date</th>
          </tr>
        </thead>
        <tbody>
          {receivableData.map((item) => (
            <tr key={item.sale_id}>
              <td>{item.sale_id}</td>
              <td>{item.inventory_name}</td>
              <td>{item.customer_first_name}</td>
              <td>{item.customer_last_name}</td>
              <td>{item.payment_type}</td>
              <td>${item.total}</td>
              <td>{item.remaining_balance}</td>
              <td>{new Date(item.sales_date).toLocaleDateString()}</td>
              <Link
                to={`/Receivable/${item.sale_id}`}
                className="view-sale-link"
              >
                Update
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Receivable;
