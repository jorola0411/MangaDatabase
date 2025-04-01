const express = require('express'); //we import express to manage the server and routes
const app = express();
const bodyParser = require('body-parser');
const mangaRouter = require('./routers/manga');
const authorsRouter = require('./routers/author');
const genreRouter = require('./routers/genre');
const usersRouter = require('./routers/users');
const cors = require("cors");
const port = 3000;

app.use(cors()); //we enable cors for all incoming requests
app.use(bodyParser.json());// this enables JSON body parsing
app.use(express.static('public')); //public folder is our static folder

app.use('/manga', mangaRouter); //we use the routers established in the router folder
app.use('/authors', authorsRouter);
app.use('/genres', genreRouter);
app.use('/users', usersRouter);

app.listen(port, () => { //app.listen starts the server.
  console.log(`Manga database listening on port ${port}`)
});