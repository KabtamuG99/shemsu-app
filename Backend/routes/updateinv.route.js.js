const express = require("express");
const router = express.Router();
const updatcontroller = require("../controller/updateinv.controller");

router.put("/update-quantity/:id", updatcontroller.quantityUpdator);
router.put("/update-price/:id", updatcontroller.priceUpdator);

module.exports = router;
