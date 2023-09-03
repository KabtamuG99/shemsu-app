import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./ReceivableDetaile.css";

function ReceivableDetaile() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({});
  const [paymentType, setPaymentType] = useState("paied");
  const [partialAmount, setPartialAmount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch transaction data from the server
    axios
      .get(`http://localhost:4000/receivables/${id}`)
      .then((response) => {
        setTransaction(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching transaction data:", error);
      });
  }, [id]);

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  const handlePartialAmountChange = (e) => {
    const amount = parseFloat(e.target.value);
    if (!isNaN(amount)) {
      setPartialAmount(amount);
    } else {
      setPartialAmount(""); // Clear input if it's not a valid number
    }
  };

  const handleUpdateTransaction = () => {
    let updatedRemainingBalance = transaction.remaining_balance;
    if (paymentType === "partially-paied" && partialAmount !== "") {
      updatedRemainingBalance -= partialAmount;
    } else if (paymentType === "paied") {
      updatedRemainingBalance = 0;
    }

    // Prepare the data to send to the server
    const dataToUpdate = {
      payment_type: paymentType,
      remaining_balance: updatedRemainingBalance,
    };

    axios
      .put(`http://localhost:4000/update-receivable/${id}`, dataToUpdate)
      .then((response) => {
        if (response.status === 200) {
          navigate("/Recivable");
        }
      })
      .catch((error) => {
        console.error("Error updating transaction:", error);
      });
  };
  return (
    <div className="receivable-detail-container">
      <div className="sales-statement-container">
        <h2 className="sales-statement-title">Sales Statement</h2>
        <ul className="sales-list">
          <li key={transaction.sale_id} className="sales-item">
            <strong className="sales-label">Sale ID:</strong>
            {transaction.sale_id}
            <br />
            <strong className="sales-label">Inventory Name:</strong>
            {transaction.inventory_name}
            <br />
            <strong className="sales-label">Customer Name:</strong>
            {`${transaction.customer_first_name} ${transaction.customer_last_name}`}
            <br />
            <strong className="sales-label">Total owed:</strong> $
            {transaction.total}
            <br />
            <strong className="sales-label">Sales Date:</strong>
            {new Date(transaction.sales_date).toLocaleDateString()}
            <br />
            <label className="sales-label">
              Payment Type:
              <select
                className="payment-type-select"
                value={paymentType}
                onChange={handlePaymentTypeChange}
              >
                <option value="paied">Paied</option>
                <option value="partially-paied">Partially Paied</option>
              </select>
            </label>
            {paymentType === "partially-paied" && (
              <label className="sales-label">
                Partial Amount:
                <input
                  className="partial-amount-input"
                  type="number"
                  value={partialAmount}
                  onChange={handlePartialAmountChange}
                />
              </label>
            )}
            <button
              className="update-transaction-button"
              onClick={handleUpdateTransaction}
            >
              Update Transaction
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ReceivableDetaile;
