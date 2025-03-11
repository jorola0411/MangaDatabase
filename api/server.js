const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mangaRouter = require('./routers/manga');
const authorsRouter = require('./routers/authors');

const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/manga', mangaRouter);
app.use('/authors', authorsRouter);

app.listen(port, () => {
  console.log(`Manga database listening on port ${port}`)
});