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

authorRouter.post('/', (req,res) =>{

    const {author_name} = req.body;
    const addAuthorSQL = `INSERT INTO authors (name) VALUES (?)`;
    db.query(addAuthorSQL, [author_name], (error, results) => {
    
        if (error) {
            console.error(error)
            return res.status(500).send('An error occurred');
        }
        res.json({ message: 'Author added successfully', author_id: results.insertId });
    });
});

module.exports = authorRouter;
