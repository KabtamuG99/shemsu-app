import React from "react";
import AddEmployee from "./Pages/AddEmployee/AddEmployee";
import AddInventory from "./Pages/AddInventory/AddInventory";
import InventoryList from "./Pages/Inventory/InventoryList";
import InventoryDetail from "./Pages/InventoryDetail/InventoryDetail";
import Sales from "./Pages/Sales/Sales";
import Receipt from "./Pages/Recipt/Receipt";
import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <>
        <Home />
        <Routes>
          <Route path="/AddEmployee" element={<AddEmployee />} />
          <Route path="/addinventory" element={<AddInventory />} />
          <Route path="/InventoryList" element={<InventoryList />} />
          <Route path="/single-inventory/:id" element={<InventoryDetail />} />
          <Route path="/Sales/:id" element={<Sales />} />
          <Route path="/Receipt" element={<Receipt />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
