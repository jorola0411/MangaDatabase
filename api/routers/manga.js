const express = require('express');
const mangaRouter = express.Router();
const upload = require('../storage');
const db = require('../db');

mangaRouter.get("/", (req, res) => {

    const sql = `
    SELECT manga.*, authors.name AS author, authors_id AS author_id
    FROM manga
    JOIN authors ON manga.author_id=authors.id
    `;
    db.query(sql, (results, error) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.json(results);
    });
});

mangaRouter.get('/:id', (req, res) => {

    const { id } = req.params;

    const sql = `
    SELECT manga.*, authors.name AS author, authors_id AS author_id
    FROM manga
    JOIN authors ON manga.author_id=authors.id
    WHERE manga.id = ?
    `

    db.query(sql, [id], (results, error) => {

        if (error) {
            console.log(error)
            res.status(500).send("Internal Server Error")
        }

        res.json(results[0]);
    });
});

mangaRouter.post('/', upload.single('image'), (req, res) =>{

    const {author, title, genre} = req.body;

    const image = req.file.filename;

    const addMangaSQL = `INSERT INTO albums (name, author, image_name, genres) VALUES (?,?,?,?)`;

    db.query(addMangaSQL, [author, title, image, genre], (results, error) => {

        if (error) {
            console.error(error);
            return res.status(500).send('An error occurred');
        }
        
        res.status(200).json({ message: 'Manga added.' });
        });
    });

mangaRouter.put("/:id", upload.single("image"), (req, res) => {

    const {id} = req.params;

    const { author_id, title, genre } = req.body;

    let updateMangaSQL = 
    `UPDATE manga
    SET name = ?, genre = ? , author_id ? `;

    const queryParams = [author_id, title, genre];

    if(req.file){

        updateMangaSQL += `, image_name = ? `;
        queryParams.push(req.file.filename);
    }

    updateMangaSQL += `WHERE id=? LIMIT 1`;
    queryParams.push(id);

    db.query(updateMangaSQL, queryParams, (results, error) => {

        if(error) {
			console.log(error);
			return res.status(500).send("Internal Server Error");
		}

		res.json({message: "Manga updated."});
    });
});

mangaRouter.get('/:id', (req, res) => {

    const { id } = req.params;
});

module.exports = mangaRouter;