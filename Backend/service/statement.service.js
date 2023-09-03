const pool = require("../config/dbconfig");
async function getAllsalesdata() {
  try {
    const [rows] = await pool.query(
      `SELECT sale_id, inventory_name,customer_first_name,customer_last_name,payment_type,selling_price,sold_quantity,total, sales_date
       FROM sale
       ORDER BY sales_date DESC`
    );
    return rows;
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error to be caught by the controller
  }
}

module.exports = {
  getAllsalesdata,
};