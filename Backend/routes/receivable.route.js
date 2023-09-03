const express = require("express");
const router = express.Router();
const receivables= require("../controller/receivable.controller");

router.get("/receivables", receivables.allCredit);
router.get("/receivables/:id", receivables.getCreditbyid);

module.exports = router;
