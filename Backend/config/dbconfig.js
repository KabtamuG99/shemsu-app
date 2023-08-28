const mysql = require("mysql2/promise"); // Import the promise-compatible module
require("dotenv").config();

const pool = mysql.createPool({
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});

let employee = `CREATE TABLE IF NOT EXISTS employee(
    user_id INT AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
)`;

let inventory = `CREATE TABLE IF NOT EXISTS inventory(
    inventory_id INT AUTO_INCREMENT,
    inventory_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    inventory_added_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    inventory_price INT NOT NULL,
    post_id varchar(255) not null,
    PRIMARY KEY (inventory_id),
    UNIQUE KEY (post_id)
)`;

let sale = `CREATE TABLE IF NOT EXISTS sale(
    sale_id INT AUTO_INCREMENT,
    inventory_id INT NOT NULL,
    inventory_name VARCHAR(255),
    inventory_price INT,
    sold_quantity INT,
    PRIMARY KEY (sale_id),
    FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id)
    
)`;

(async () => {
  try {
    const connection = await pool.getConnection(); // Acquire a connection
    await connection.query(employee); // Execute the query
    await connection.query(inventory); // Execute the query
    await connection.query(sale); // Execute the query
    connection.release(); // Release the connection
    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
})();

module.exports = pool;
