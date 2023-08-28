const express = require("express");
const router = express.Router();
const employeeadder = require("../controller/employee.controller");
router.post("/add-employee", employeeadder.employee);
module.exports = router;
