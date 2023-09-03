const express = require("express");
const router = express.Router();
const paymentUpdator = require("../controller/updatereceivable.controller");
router.put("/update-receivable/:id", paymentUpdator.updator);
module.exports = router;
