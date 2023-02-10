var pg = require('pg');
const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "sobored2",
        database: "postgres",
        port: 3002,
})

var conString = "postgres://root:sobored2@localhost:3002/postgres";

var client = new pg.Client(conString);

client.connect();

client.query("INSERT INTO TestData (id, name) VALUES (12, 'h')");
client.query("INSERT INTO TestData (id, name) VALUES (14, 'g')");

console.log("about to query");

async function here() {
    try{
        await client.connect();
        var res = await client.query("SELECT * FROM TestData");
        res.rows.forEach(row=>{
            console.log(row);
        });
        await client.end();
    } catch {
        return;
    }

}


















// /*
// Development section with custom scripts:

// to run server in development mode (constant refresh)
// nodemon index.js

// to run server static (no refresh)
// node index.js
// */

// const express = require("express");
// const app = express();
// const mysql = require("mysql");

// const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "sobored2",
//     database: "postgres",
//     port: 3002,
// })

// // once someone accesses the home page, it will send hello world
// // req = get information from the frontend
// // res = response to be sent to the frontend
// app.get('/', (req, res) => {
//     const sqlInsert = "INSERT INTO TestData(id, name) VALUES (18234121, 'h');";
//     db.query(sqlInsert, (err, result) => {
//         res.send("sent!");
//     })
// })

// // once someone access the sales page, it will send something else
// app.get('/sales', (req, res) => {
//     res.send("You are at sales");
// })

// // access localhost:3001
// app.listen(3002, () => {
//     console.log("running on port 3002");
// })