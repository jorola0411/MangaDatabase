const express = require("express");
const genreRouter = express.Router();
const db = require("../db");

genreRouter.get("/", (req, res) => {
    const sql = 'SELECT * FROM genres';
    db.query(sql, (results, error) => {

        if (error) {
            res.status(500).send(error);
            return;
        }
        res.json(results)

    });
});

genreRouter.post('/', (req,res) =>{

    const {new_genre} = req.body;
    const addAuthorSQL = `INSERT INTO genres (name) VALUES (?)`;
    db.query(addAuthorSQL, [new_genre], (results, error) => {
    
        if (error) {
            console.error(error)
            return res.status(500).send('An error occurred');
        }
        res.json({ message: 'Genre added successfully', id: results.insertId });
    });
});

module.exports = genreRouter;
