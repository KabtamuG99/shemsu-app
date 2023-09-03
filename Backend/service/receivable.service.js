const pool = require("../config/dbconfig");
async function getAllcreditdata() {
  try {
    const [rows] = await pool.query(
      `SELECT sale_id,inventory_name,customer_first_name,customer_last_name,total,payment_type,remaining_balance,sales_date FROM sale WHERE payment_type IN ('on_account', 'partially-paied')`
    );
    return rows;
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error to be caught by the controller
  }
}
async function getsinglecredit(id) {
  try {
    const [rows] = await pool.query(`SELECT * FROM sale WHERE sale_id = ?`, [id]);
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  getAllcreditdata,
  getsinglecredit,
};