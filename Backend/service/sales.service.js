const pool = require("../config/dbconfig");
async function adder(data) {
  let createdinv = {};
  try {
    const query = `INSERT INTO sale(inventory_id, inventory_name, inventory_price ,sold_quantity) VALUES (?, ?, ?,?)`;
    const [rows] = await pool.query(query, [
      data.inventory_id,
      data.inventory_name,
      data.inventory_price,
      data.sold_quantity
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
