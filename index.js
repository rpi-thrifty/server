/*
Development section with custom scripts:

to run server in development mode (constant refresh)
nodemon index.js

to run server static (no refresh)
node index.js
*/
// server
//connect to database and `SELECT * FROM public.clients`
var pg = require('pg');
var connectionString = 'postgresql://doadmin:AVNS_nZkr6SUCVGnV_ch-7lB@thrifty-do-user-13664740-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=require'
var pgClient = new pg.Client(connectionString);
pgClient.connect();
const express = require("express");
const app = express();

// receiving data from the frontend here
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/api/array', (req, res) => {
    const data = req.body.data;
    console.log(data);
    res.send({ message: 'Array received!' });
  });

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

// access localhost:3002
app.listen(3002, () => {
    console.log("running on port 3002");
})

