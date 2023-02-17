/*
Development section with custom scripts:

to run server in development mode (constant refresh)
nodemon index.js

to run server static (no refresh)
node index.js
*/
// server
//connect to database and `SELECT * FROM public.clients`
const { Client } = require('pg');
const client = new Client({
    user: "johcuvld",
    host: "castor.db.elephantsql.com",
    database: "johcuvld",
    password:"EquCpGVmavxto3I3rxif8lZMmEEnqQLN",
    port: "5432",
}
);
client.connect();
const query = 'SELECT * FROM "public"."clients" LIMIT 100';
client.query(query, (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log(res.rows);
    }
});

const express = require("express");
const app = express();

// once someone accesses the home page, it will send hello world
// req = get information from the frontend
// res = response to be sent to the frontend
app.get('/', (req, res) => {
    res.send("Hello World!");
})

// once someone access the sales page, it will send something else
app.get('/sales', (req, res) => {
    res.send("You are at sales");
})

// access localhost:3001
app.listen(3002, () => {
    console.log("running on port 3002");
})

client.end();