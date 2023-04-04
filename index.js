const express = require("express");
const autocorrect = require('autocorrect');
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
//code me a node js function that connects to a database with 4 tables, electronics, clothing, furniture, misc and then searches through the titles of each table and returns the results =
function searchTitles(tag, searchTerm) {
    return new Promise((resolve, reject) => {
        let query = '';
        switch (tag) {
            case 'electronics':
                query = `SELECT * FROM Electronics WHERE title LIKE '%${searchTerm}%'`;
                break;
            case 'clothing':
                query = `SELECT * FROM clothing WHERE title LIKE '%${searchTerm}%'`;
                break;
            case 'furniture':
                query = `SELECT * FROM furniture WHERE title LIKE '%${searchTerm}%'`;
                break;
            case 'misc':
                query = `SELECT * FROM misc WHERE title LIKE '%${searchTerm}%'`;
                break;
            case 'all':
                query = `SELECT * FROM Electronics WHERE title LIKE '%${searchTerm}%' UNION ALL 
                 SELECT * FROM clothing WHERE title LIKE '%${searchTerm}%' UNION ALL 
                 SELECT * FROM furniture WHERE title LIKE '%${searchTerm}%' UNION ALL 
                 SELECT * FROM misc WHERE title LIKE '%${searchTerm}%'`;
                break;
            default:
                reject('Invalid tag provided');
                return;
        }
        connection.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}
function getItemsByTag(tag) {
    return new Promise((resolve, reject) => {
        let query = '';
        switch (tag) {
            case 'electronics':
                query = 'SELECT * FROM Electronics';
                break;
            case 'clothing':
                query = 'SELECT * FROM clothing';
                break;
            case 'furniture':
                query = 'SELECT * FROM furniture';
                break;
            case 'misc':
                query = 'SELECT * FROM misc';
                break;
            case 'all':
                query = 'SELECT * FROM Electronics UNION ALL SELECT * FROM clothing UNION ALL SELECT * FROM furniture UNION ALL SELECT * FROM misc';
                break;
            default:
                reject('Invalid tag provided');
                return;
        }
        connection.query(query, (err, results) => {
            if (err) reject(err);
            const resultArrays = [];
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                const values = Object.values(result);
                resultArrays.push(values);
            }
            resolve(resultArrays);
        });
    });
}

function autocorrectWord(word) {
    return autocorrect(word);
}

// once someone accesses the home page, it will send hello world
// req = get information from the frontend
// res = response to be sent to the frontend
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

