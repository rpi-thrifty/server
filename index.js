const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

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


//ROUTES
app.get('/', (req, res) => {
    res.send("running");
})

app.post("/", async(req, res) => {
    const {combineDict} = req.body;
    console.log(combineDict);
})

app.listen(3002, () => {
    console.log("running on port 3002");
})

client.end();


// // create
// const first_name = "John";
// const last_name = "Doe";
// const email = "john.doe@example.com";
// const phone = "555-555-1212";

// app.post("/items", async(req, res) => {
//     try {
//         const newClient = await pool.query(
//             "INSERT INTO clients (first_name, last_name, email, phone) VALUES($1, $2, $3, $4) RETURNING *",
//             [first_name, last_name, email, phone]
//         );
//         res.json(newTodo.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// })

// // get all
// app.get("/items", async (req, res) => {
//     try {
//         const allTodos = await pool.query("SELECT * FROM clients");
//         res.json(allTodos.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });