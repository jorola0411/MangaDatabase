const express = require("express");
const authorRouter = express.Router();
const db = require("../db");

authorRouter.get("/", (req, res) => {
    const sql = 'SELECT * FROM authors';
    db.query(sql, (error, results) => {

        if (error) {
            res.status(500).send(error);
            return;
        }
        res.json(results)

    });
});

authorRouter.post('/', (req,res) =>{ //handles POST requests to add a new artist

    const {author_name} = req.body; //this gets a new author name from the req body.
    const addAuthorSQL = `INSERT INTO authors (name) VALUES (?)`; //this creates an SQL query to insert the new author to the database.
    db.query(addAuthorSQL, [author_name], (error, results) => { //executes the query but replaces the ? with the author name
    
        if (error) { //error and success handling.
            console.error(error)
            return res.status(500).send('An error occurred');
        }
        res.json({ message: 'Author added successfully', author_id: results.insertId });
    });
});

module.exports = authorRouter;
