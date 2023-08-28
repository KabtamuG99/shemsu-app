const express = require("express");
const router = express.Router();
const salesdata = require("../controller/sales.controller");

router.post("/sales-data", salesdata.sale);

module.exports = router;
