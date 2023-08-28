import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./Home.css"

function Home() {
    const navigate = useNavigate()
    const handleEmployee = (e)=>{
        e.preventDefault()
        navigate("/addemployee");
    }
     const handleinventory = (e) => {
       e.preventDefault();
       navigate("/addinventory");
     };
     const listInve = (e) => {
       e.preventDefault();
       navigate("/InventoryList");
     };
     const Return = (e) =>{
        navigate("/");
     }
  return (
    <div>
      <h1>Home</h1>
      <h2>Welcome to shemsu Mrt </h2>
      <div className="button-container">
        <button className="button" onClick={handleEmployee}>
          Add Employee
        </button>
        <button className="button" onClick={handleinventory}>
          Add inventory
        </button>
        <button className="button" onClick={listInve}>
          avilable inventory
        </button>
        <button className="button" onClick={Return}>
          Return
        </button>
      </div>
    </div>
  );
}

export default Home