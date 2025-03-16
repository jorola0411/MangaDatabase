const express = require("express");
const authorRouter = express.Router();
const db = require("../db");

authorRouter.get("/", (req, res) => {
    const sql = 'SELECT * FROM authors';
    db.query(sql, (results, error) => {

        if (error) {
            res.status(500).send(error);
            return;
        }
        res.json(results)

    });
});

authorRouter.post('/', (req,res) =>{

    const {new_author} = req.body;
    const addAuthorSQL = `INSERT INTO authors (name) VALUES (?)`;
    db.query(addAuthorSQL, [new_author], (results, error) => {
    
        if (error) {
            console.error(error)
            return res.status(500).send('An error occurred');
        }
        res.json({ message: 'Author added successfully', id: results.insertId });
    });
});

module.exports = authorRouter;
