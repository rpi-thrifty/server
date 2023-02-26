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
    port: "3002",
});
// put password in an env file

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
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES

// create
const first_name = "John";
const last_name = "Doe";
const email = "john.doe@example.com";
const phone = "555-555-1212";

app.post("/items", async(req, res) => {
    try {
        const newClient = await pool.query(
            "INSERT INTO clients (first_name, last_name, email, phone) VALUES($1, $2, $3, $4) RETURNING *",
            [first_name, last_name, email, phone]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// get all
app.get("/items", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM clients");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

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

app.listen(5432, () => {
    console.log("running on port 5432");
})

// access localhost:3002
app.listen(3002, () => {
    console.log("running on port 3002");
})

client.end();
