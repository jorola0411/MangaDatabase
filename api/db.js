const mysql = require("mysql2");

const mangadb = mysql.createConnection({
    user: "root",
    password: 'root',
    database: "manga",
    host: "localhost",
    port: "8889"
});

db.connect( (error) => {

    if(error) {
      console.log("Error connecting to database" , error);
      return;
    }
  
    console.log("Database connected");
  
  });
module.exports = mangadb;