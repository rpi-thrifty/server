/*
Development section with custom scripts:

to run server in development mode (constant refresh)
nodemon index.js

to run server static (no refresh)
node index.js
*/
// server
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//connect to database and `SELECT * FROM public.clients`




const express = require("express");
const app = express();

// receiving data from the frontend here
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const { Client } = require('pg');

const connectionString = 'postgresql://doadmin:AVNS_nZkr6SUCVGnV_ch-7lB@thrifty-do-user-13664740-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=require';
const pgClient = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

pgClient.connect()
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Error connecting to database', err));

app.post('/api/array', async (req, res) => {
    const data = req.body.data;
    console.log(data);

    try {
        await pgClient.query('BEGIN');

        // Get the current maximum id from the clients table


        // Insert each array item into the clients table
     if (data[4] === 1) {
            const {
                email,
                phone,
                title,
                price,
                quantity,
                description,
            } = data[i];
            const fullName = `${data[i].firstName} ${data[i].lastName}`;
            const getMaxIdQuery = 'SELECT MAX(client_id) FROM Electronics';
            const result = await pgClient.query(getMaxIdQuery);
            const maxId = result.rows[0].max + 1;
            const query =
                'INSERT INTO Electronics (client_id, full_name, email, phone, title, price, quantity, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
            const values = [
                maxId,
                fullName,
                email,
                phone,
                title,
                price,
                quantity,
                description,
            ];
            await pgClient.query(query, values);
        }
        else if (data[4] === 2) {
            const {
                email,
                phone,
                title,
                price,
                quantity,
                description,
            } = data[i];
            const fullName = `${data[i].firstName} ${data[i].lastName}`;
            const getMaxIdQuery = 'SELECT MAX(client_id) FROM clothing';
            const result = await pgClient.query(getMaxIdQuery);
            const maxId = result.rows[0].max + 1;
            const query =
                'INSERT INTO clothing (client_id, full_name, email, phone, title, price, quantity, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
            const values = [
                maxId,
                fullName,
                email,
                phone,
                title,
                price,
                quantity,
                description,
            ];
            await pgClient.query(query, values);
        }
     else if (data[4] === 3) {
         const {
             email,
             phone,
             title,
             price,
             quantity,
             description,
         } = data[i];
         const fullName = `${data[i].firstName} ${data[i].lastName}`;
         const getMaxIdQuery = 'SELECT MAX(client_id) FROM furniture';
         const result = await pgClient.query(getMaxIdQuery);
         const maxId = result.rows[0].max + 1;
         const query =
             'INSERT INTO furniture (client_id, full_name, email, phone, title, price, quantity, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
         const values = [
             maxId,
             fullName,
             email,
             phone,
             title,
             price,
             quantity,
             description,
         ];
         await pgClient.query(query, values);
     }else if (data[4] === 4) {
         const {
             email,
             phone,
             title,
             price,
             quantity,
             description,
         } = data[i];
         const fullName = `${data[i].firstName} ${data[i].lastName}`;
         const getMaxIdQuery = 'SELECT MAX(client_id) FROM misc';
         const result = await pgClient.query(getMaxIdQuery);
         const maxId = result.rows[0].max + 1;
         const query =
             'INSERT INTO misc (client_id, full_name, email, phone, title, price, quantity, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
         const values = [
             maxId,
             fullName,
             email,
             phone,
             title,
             price,
             quantity,
             description,
         ];
         await pgClient.query(query, values);
     }

        await pgClient.query('COMMIT');
        res.send({ message: 'Array received and inserted into database!' });
    } catch (err) {
        await pgClient.query('ROLLBACK');
        console.error(err);
        res.status(500).send({ error: 'Error inserting data into database' });
    }
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

