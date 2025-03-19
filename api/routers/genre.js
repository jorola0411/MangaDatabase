const express = require("express");
const genreRouter = express.Router();
const db = require("../db");

genreRouter.get("/", (req, res) => {
    const sql = 'SELECT * FROM genres';
    db.query(sql, (error, results) => {

        if (error) {
            res.status(500).send(error);
            return;
        }
        res.json(results)

    });
});

genreRouter.post('/', (req,res) =>{

    const { genre_name } = req.body;
    const addAuthorSQL = `INSERT INTO genres (name) VALUES (?)`;
    db.query(addAuthorSQL, [genre_name], ( error, results) => {
    
        if (error) {
            console.error(error)
            return res.status(500).send('An error occurred');
        }
        res.json({ message: 'Genre added successfully', genre_id: results.insertId });
    });
});

module.exports = genreRouter;
