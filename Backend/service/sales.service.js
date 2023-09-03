const pool = require("../config/dbconfig");
async function adder(data) {
  let createdinv = {};
  try {
    const query = `INSERT INTO sale(inventory_id, inventory_name,customer_first_name,customer_last_name,payment_type, selling_price ,sold_quantity,total,remaining_balance) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)`;
    const [rows] = await pool.query(query, [
      data.inventory_id,
      data.inventory_name,
      data.customer_first_name,
      data.customer_last_name,
      data.payment_type,
      data.selling_price,
      data.sold_quantity,
      data.total,
      data.remaining_balance,
    ]);

    let inveId = rows.insertId;
    console.log(inveId);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false; // Return false on failed insertion
    }
    createdinv = {
      inveId: inveId,
    };
  
    console.log(createdinv);
  } catch (err) {
    console.log(err);
    return false; 
  }
  return createdinv; // Return the createdinv object on successful insertion
}
module.exports = {
  adder,
};
