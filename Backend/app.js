require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/dbconfig");
const employeerouter = require("./routes/employee.route");
const inventoryrouter = require("./routes/inventory.route")
const updaterouter = require("./routes/updateinv.route.js")
const salesrouter = require("./routes/sales.route")
const statementrouter = require("./routes/statement.route")
const receivablerouter = require("./routes/receivable.route");
const updateReceivables = require("./routes/updatereceivable.route")

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the router
app.use(employeerouter);
app.use(inventoryrouter);
app.use(updaterouter);
app.use(salesrouter);
app.use(statementrouter);
app.use(receivablerouter);
app.use(updateReceivables);


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;
