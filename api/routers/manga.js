//manga router handles the core information of the database, and enables adding, editing, viewing, and deleting manga.
const express = require('express');
const mangaRouter = express.Router();
const upload = require('../storage');
const db = require('../db');

mangaRouter.get("/", (req, res) => { //this line of code would get all the mangas
    const authorFilters = req.query.authors;  //this gets the author/genre filters if filtered in the front end
    const genreFilters = req.query.genres;

    let sql = `
    SELECT manga.*, authors.name AS author, manga.author_id AS author_id, genres.name AS genre, manga.genre_id = genres.id
    FROM manga
    JOIN authors ON manga.author_id = authors.id
    JOIN genres ON manga.genre_id = genres.id
    `;
    const conditions = []; //these arrays store the conditons and query params
    const queryParams = [];

    if (authorFilters) { //filtering conditions for the genre/authors if provided in the front end
        const authors = Array.isArray(authorFilters) ? authorFilters : [authorFilters];
        conditions.push(`manga.author_id IN (${authors.map(() => '?').join(',')})`);
        queryParams.push(...authors);
      }
    
      if (genreFilters) {
        const genres = Array.isArray(genreFilters) ? genreFilters : [genreFilters];
        conditions.push(`manga.genre_id IN (${genres.map(() => '?').join(',')})`);
        queryParams.push(...genres);
      }
      if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
      }

    db.query(sql, queryParams, (error, results) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.json(results);
    });
});

mangaRouter.get('/:id', (req, res) => { //this gets the individual manga from the data base

    const { id } = req.params;

    const sql = {/* this is the sql queries for the database */ } ` 
    SELECT manga.*, authors.name AS author, manga.author_id AS author_id, genres.name AS genre, manga.genre_id = genres.id,  manga.description
    FROM manga
    JOIN authors ON manga.author_id=authors.id
    JOIN genres ON manga.genre_id = genres.id
    WHERE manga.id = ?
    `
    
    db.query(sql, [id], (error, results) => {

        if (error) {
            console.log(error)
            res.status(500).send("Internal Server Error")
        }

        res.json(results[0]);
    });
});

mangaRouter.post('/', upload.single('image'),  (req, res) => { //this is the back end code for adding a new manga

    const { author_id, title, genre_id, description } = req.body;

    const image_name = req.file.filename;

    const addMangaSQL = `INSERT INTO manga (author_id, name, genre_id, image_name, description) VALUES (?, ?, ?, ?, ?)`;

    db.query(addMangaSQL, [author_id, title, genre_id, image_name, description], (error, results) => {

        if (error) {
            console.error(error);
            return res.status(500).send('An error occurred');
        }

        res.status(200).json({ message: 'Manga added.' });
    });
});

mangaRouter.put("/:id", upload.single("image"), (req, res) => { //this is used to update an existing manga

    const { id } = req.params;

    const { author_id, title, genre_id, description } = req.body;

    let updateMangaSQL =
    `UPDATE manga
    SET author_id = ?, name = ?, genre_id = ? , description = ? `;

    const queryParams = [author_id, title, genre_id, description];

    if (req.file) {
        updateMangaSQL += `, image_name = ? `;
        queryParams.push(req.file.filename);
    }

    updateMangaSQL += `WHERE id=? LIMIT 1`;
    queryParams.push(id);

    db.query(updateMangaSQL, queryParams, (error, results) => {

        if (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }

        res.json({ message: "Manga updated." });
    });
});

mangaRouter.delete("/:id", (req, res) => { //this deleted the manga by ID

    const id = req.params.id;
    const sql = `DELETE FROM manga WHERE id = ? LIMIT 1`

    db.query(sql, [id], (error, results) => {

        if(error) {
          console.log(error); 
          res.status(500).send("Interal Server Error");
        }
    
        res.json({message: "Manga Deleted"});
    
      });
    
    });


mangaRouter.get('/:id', (req, res) => {

    const { id } = req.params;
});

module.exports = mangaRouter;