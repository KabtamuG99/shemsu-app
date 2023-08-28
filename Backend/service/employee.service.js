const pool = require("../config/dbconfig");

async function adder(data) {
  console.log(data);
   const employeprofile = {};
  try {
    const query =
      "INSERT INTO employee (user_name, user_email, user_password) VALUES (?, ?, ?)";
    const [row] = await pool.query(query, [
      data.user_name,
      data.user_email,
      data.user_password,
    ]);

    console.log(row);
      

    if (row.affectedRows !== 1) {
      return false;
    }

    const employee_id = row.insertId;
    console.log("Employee ID:", employee_id);

  const employeprofile = {
    employee_id: employee_id,
  };

    return employeprofile;
  } catch (err) {
    console.log(err);
    return false;
  }
  // return employeprofile;
}

module.exports = {
  adder,
};
