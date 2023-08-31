import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sales.css"
import { useNavigate, useParams } from "react-router-dom";

function Sales() {
    const { id } = useParams(); 
  return <div>Sales</div>;
}

export default Sales;
