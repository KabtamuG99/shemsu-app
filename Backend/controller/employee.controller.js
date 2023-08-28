const employeeadder = require("../service/employee.service");

async function employee(req, res, next) {
  try {
    console.log(req.body);
    const employedata = req.body;
    const filldata = await employeeadder.adder(employedata);
    if (filldata === false) {
      res.status(400).json({
        error: "Failed to add the employee!",
      });
      console.log(filldata);
    } else (filldata === true) 
      res.status(200).json({
        status: "true",
        message: "Employee added successfully",
      });
    
    // Include the "res.end()" statement outside of the "if" blocks
    // res.end("Successfully added"); // You can customize this message
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = { employee };
