const mysql = require("mysql");
const { promisify } = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "socketIO",
});

connection.query = promisify(connection.query).bind(connection);

connection.connect((err) => {
  if (err) {
    console.log("error:", err);
  } else {
    console.log("DB connected");
  }
});

module.exports = connection;
