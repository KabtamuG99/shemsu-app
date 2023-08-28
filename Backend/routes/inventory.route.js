const express = require("express");
const router = express.Router();
const inventoryAdder = require("../controller/inventory.controller");

router.post("/add-inventory", inventoryAdder.addinventory);
router.get("/all-inventory", inventoryAdder.allinventory);
router.get("/:id", inventoryAdder.getinventorybyid);


module.exports = router;
