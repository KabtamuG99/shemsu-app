import React from "react";
import AddEmployee from "./Pages/AddEmployee/AddEmployee";
import AddInventory from "./Pages/AddInventory/AddInventory";
import InventoryList from "./Pages/Inventory/InventoryList";
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
        </Routes>
      </>
    </div>
  );
}
export default App;
