var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE bids (id INTEGER PRIMARY KEY AUTOINCREMENT, auctionName text, user text, bid text)`,
        (err) => {
            if (err) {
                // Table already created
                console.error(err.message)
            }else{
                // Table just created, creating some rows
                console.log("table created")
                var insert = 'INSERT INTO bids (auctionName, user, bid) VALUES (?,?,?)'
                db.run(insert, ["Angel Tree", "admin","20"])
                db.run(insert, ["Angel Tree", "user","30"])
                db.run(insert, ["Automobile", "user","30"])
            }
        });  
        db.run(`CREATE TABLE auctions (id INTEGER PRIMARY KEY AUTOINCREMENT, name text)`,
        (err) => {
            if (err) {
                // Table already created
                console.error(err.message)
            }else{
                // Table just created, creating some rows
                console.log("table created")
                var insert = 'INSERT INTO auctions (name) VALUES (?)'
                db.run(insert, ["Angel Tree"])
                db.run(insert, ["Automobile"])
            }
        });
        db.run(`CREATE TABLE auctions (id INTEGER PRIMARY KEY AUTOINCREMENT, auctionName text, auctionDescription text, bidUser text, bidAmount int)`,
        (err) => {
            if (err) {
                // Table already created
                console.error(err.message)
            }else{
                // Table just created, creating some rows
                console.log("table created")
                var insert = 'INSERT INTO auctions (auctionName, auctionDescription, bidUser, bidAmount) VALUES (?,?,?,?)'
                db.run(insert, ["auction1","test1", "sburlett", "100"])
                db.run(insert, ["auction2","test2", "sburlett", "120"])
            }
        });    
    }
});


module.exports = db