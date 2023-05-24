const mysql = require("mysql2");

const connections = mysql.createConnections({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees"
});

connections.connect(function (err) {
  if (err) throw err;
});

module.exports = connections;