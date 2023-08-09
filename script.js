// Arrays that contain the words the function will be able to pull from.
const subjectWords = [];
const verbWords = [];
const objectWords = [];

// Function that creates random words from the given arrays.
function createRandomWord(subject, verb, object){

    

};

function pushSentenceToDb(sentence){

    const sqlite3 = require('sqlite3').verbose();
    
    // opens the database connection
    let db = new sqlite3.Database('sentences.db');
    
    // insert one row into the savedSentences table
    db.run(`INSERT INTO savedSentences (sentence) VALUES ("${sentence}");`, function(err) {
        if (err) {
            return console.log(err.message);
        }
    });

    // close the database connection
    db.close();

};

function readSentencesFromDb(){

    const sqlite3 = require('sqlite3').verbose();
    
    // opens the database connection
    let db = new sqlite3.Database('sentences.db');

    // sql querry which needs to be run
    let sql = "SELECT * FROM savedSentences";

    // runs the querry in "sql" and accepts "err" if an error happens / if no "err" the "rows" will be exportet from the db
    db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          console.log(row.sentence);
        });
      });

    // close the database connection
    db.close();

};


readSentencesFromDb();