const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "DH",
  password: "",
  database: "record",
});
con.connect(function (err, name, score) {
  if (err) throw err;
  const sql = "INSERT INTO record (игрок, очки) VALUES ?";
  const values = [[name, score]];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
  });
});
