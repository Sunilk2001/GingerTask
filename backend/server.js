const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6683184",
  password: "ssqQ7ai8Xi",
  database: "sql6683184",
});

app.listen(8000, () => {
  console.log("listening");
});

app.post("/signup", (req, res) => {
  console.log("req----->", req);
  const sql =
    "INSERT INTO users (`name`,`age`,`dob`,`contact`,`email`,`password`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.age,
    req.body.dob,
    req.body.contact,
    req.body.email,
    req.body.password,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  console.log("req body ----->", req.body);
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  const values = [req.body.email, req.body.password];

  db.query(sql, values, (err, data) => {
    console.log("data--->", data, values);
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Failed");
    }
  });
});

app.get("/details", (req, res) => {
  console.log("req query ----->", req.query);
  const sql = "SELECT * FROM users WHERE email = ?";

  const email = req.query.email; // Access email from query parameters

  db.query(sql, [email], (err, data) => {
    console.log("data--->", data);
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Failed");
    }
  });
});

app.put("/updateDetails", (req, res) => {
  const { newName, newAge, newDob, newContact, email, newPassword } = req.body;
  const sql =
    "UPDATE users SET name = ?, age = ?, dob = ?, contact = ?, password = ? WHERE email = ?";
  const values = [newName, newAge, newDob, newContact, newPassword, email]; // Corrected order

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating user details:", err);
      return res.json("Error");
    }
    if (result.affectedRows > 0) {
      console.log("User details updated successfully");
      return res.json("Success");
    } else {
      console.log("No user found with the provided email");
      return res.json("Failed");
    }
  });
});
