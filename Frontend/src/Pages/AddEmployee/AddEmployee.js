import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddEmployee.css"; 

const AddEmployee = () => {
  const [userData, setUserData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
  });
    const navigate = useNavigate();
  console.log(userData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/add-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
alert("User registered successfully! ");
navigate("/")
      } else {
        // Handle error if the response status is not ok
        console.error("Failed to register user.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="user-form-container">
      <h2>Add Employee</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Name:</label>
          <input
            type="text"
            name="user_name"
            value={userData.user_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Employee Email:</label>
          <input
            type="email"
            name="user_email"
            value={userData.user_email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="user_password"
            value={userData.user_password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );};

export default AddEmployee;
