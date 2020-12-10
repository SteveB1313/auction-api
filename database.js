var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE bids (id INTEGER PRIMARY KEY AUTOINCREMENT, user text, bid text)`,
        (err) => {
            if (err) {
                // Table already created
                console.error(err.message)
            }else{
                // Table just created, creating some rows
                console.log("table created")
                var insert = 'INSERT INTO bids (user, bid) VALUES (?,?)'
                db.run(insert, ["admin","20"])
                db.run(insert, ["user","30"])
            }
        });  
    }
});


module.exports = db