const pool = require("../config/dbconfig");

async function checkinventory(data) {
  let bodydata = data.inventory_name;
  try {
    const query = "SELECT * FROM inventory WHERE inventory_name = ? ";
    const [rows] = await pool.query(query, [bodydata]);

    if (rows.length > 0) {
      return true; // Inventory already exists
    }
    return false; // Inventory doesn't exist
  } catch (err) {
    console.log(err);
    return true; // Consider it as existing to handle the error scenario
  }
}

async function adder(data) {
  let createdinv = {};
  try {
    const query = `INSERT INTO inventory(inventory_name, quantity, inventory_price,post_id) VALUES (?, ?, ?,?)`;
    const [rows] = await pool.query(query, [
      data.inventory_name,
      data.quantity,
      data.inventory_price,
      data.post_id
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
    return false; // Return false on error
  }
  return createdinv; // Return the createdinv object on successful insertion
}

async function getAllinventory() {
  try {
    const [rows] = await pool.query(
      `SELECT inventory_id, inventory_name, quantity, inventory_added_date, inventory_price, post_id
       FROM inventory
       ORDER BY inventory_id DESC`
    );
    return rows;
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error to be caught by the controller
  }
}


async function inventorybyid(id){
     try {
       const [rows] = await pool.query(
         `SELECT * FROM inventory WHERE post_id = ?`,
         [id]
       );
         return rows;
     } catch (err) {
       console.log(err);
       throw err; 
     }
}




module.exports = {
  adder,
  checkinventory,
  getAllinventory,
  inventorybyid,
};


// // or we can use this function to return all inventory
// async function getAllinventory(callback) {
//   let inventoryData = {};
//   try {
//     const [rows] = await pool.query(
//       `SELECT inventory_id,inventory_name,quantity,inventory_added_date,inventory_price FROM inventory`
//     );
//     const sentdata = rows;
//     inventoryData = {
//       sentdata: sentdata,
//     };
//   } catch (err) {
//     console.log(err);
//     return false; // Return false on error
//   }

//   console.log(inventoryData);
//   return inventoryData;
// }


