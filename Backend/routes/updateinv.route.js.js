const express = require("express");
const router = express.Router();
const updatcontroller = require("../controller/updateinv.controller");

router.put("/:id/update-quantity", updatcontroller.quantityUpdator);
router.put("/:id/update-price", updatcontroller.priceUpdator);

module.exports = router;
