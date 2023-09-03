const express = require("express");
const router = express.Router();
const salesdata = require("../controller/statement.controller");

router.get("/statement-data", salesdata.allsales);

module.exports = router;
