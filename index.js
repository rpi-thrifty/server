/*
Development section with custom scripts:

to run server in development mode (constant refresh)
nodemon index.js

to run server static (no refresh)
node index.js
*/

const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "TestData",
})

// once someone accesses the home page, it will send hello world
// req = get information from the frontend
// res = response to be sent to the frontend
app.get('/', (req, res) => {
    const sqlInsert = "INSERT INTO test(id, name, price) VALUES ('18234121', 'potato', '42');";
    db.query(sqlInsert, (err, result) => {
        res.send("sent!");
    })
})

// once someone access the sales page, it will send something else
app.get('/sales', (req, res) => {
    res.send("You are at sales");
})

// access localhost:3001
app.listen(3002, () => {
    console.log("running on port 3002");
})