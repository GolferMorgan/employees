const mysql = require("mysql2");
require('dotenv').config();

const connections = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connections.connect(function (err) {
  if (err) throw err;
});

module.exports = connections; 