/*
Development section with custom scripts:

to run server in development mode (constant refresh)
nodemon index.js

to run server static (no refresh)
node index.js
*/

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); 

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES

// create

app.post("/items", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO table_test (description) VALUES($1$) RETURNING *",
            [description]
        )
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// get all

app.get("/items", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM table_test");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})


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