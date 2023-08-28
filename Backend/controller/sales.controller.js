const salespost = require("../service/sales.service")


async function sale(req, res, next) {
  try {
    console.log(req.body);
    const salesdata = req.body;
    const filldata = await salespost.adder(salesdata);
    if (filldata === false) {
      res.status(400).json({
        error: "Failed to add sales data!",
      });
      console.log(filldata);
    } else filldata === true;
    console.log("filde" + filldata);
    res.status(200).json({
      status: "true",
      message: "sales data added successfully",
      sale_id: filldata.sale_id, // Include the employee ID in the response
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

module.exports = {
  sale,
};
