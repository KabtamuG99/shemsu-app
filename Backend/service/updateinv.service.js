const pool = require("../config/dbconfig");

async function quantityUpdator(id, quantity) {
  try {
    const query = `
      UPDATE inventory SET quantity = ? WHERE post_id = ?
    `;
    const [rows] = await pool.query(query, [quantity, id]);
    console.log(rows);

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

async function priceUpdator(id, selling_price) {
  try {
    const query = `UPDATE inventory SET selling_price = ? WHERE post_id = ?`;
    const [rows] = await pool.query(query, [selling_price, id]);
    console.log(rows);

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
  priceUpdator,
  quantityUpdator,
};
