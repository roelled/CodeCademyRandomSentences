// Arrays that contain the words the function will be able to pull from.
const subjectWords = ["I", "You", "They", "We", "Diane", "James", "The helicopter", "The Dog", "The mouse"];
const verbWords = ["eats", "plays", "reads", "shows", "nibles", "creates", "sees", "feels", "restores"];
const objectWords = ["ass", "ball", "tennis", "football", "code", "wood"];

createRandomWord(subjectWords, verbWords, objectWords);

// Function that creates random words from the given arrays.
function createRandomWord(subject, verb, object){

  let sentence = "";

  const subNum = Math.floor(Math.random() * subjectWords.length);
  const verbNum = Math.floor(Math.random() * verbWords.length);
  const objNum = Math.floor(Math.random() * objectWords.length);

  sentence = subject[subNum] + " " + verb[verbNum] + " " + object[objNum] + ".";
  
  pushSentenceToDb(sentence);

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
        // get the last inserted sentence
        console.log(`The following row has been inserted: ${sentence}`);
    });

    // close the database connection
    db.close();

    console.log("The following sentences have been created:");
    readSentencesFromDb();

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