const pool = require("../config/dbconfig");
async function updateTransaction(payment_type, remaining_balance, id) {
  try {
    const [rows] = await pool.query(
      `UPDATE sale SET payment_type = ?, remaining_balance = ? WHERE sale_id = ?`,
      [payment_type, remaining_balance, id]
    );
 if (rows.affectedRows === 1) {
   return true; // Successfully updated
 } else {
   return false; // Failed to update
 }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
module.exports = {
  updateTransaction,
};