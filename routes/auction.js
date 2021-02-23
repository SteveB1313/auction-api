var express = require('express');
const { InsufficientStorage } = require('http-errors');
const db = require('../database');

var router = express.Router();

<<<<<<< HEAD
/* GET all acutions. */
=======
/* GET all auctions */
>>>>>>> c74055557b7349cca127c4e67a1baa5004edd53e
router.get("/", (req, res, next) => {
  var sql = "select * from auctions"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
<<<<<<< HEAD
      console.log(rows)
      var obj = JSON.stringify(rows);
      // res.json({ "message":"success", "data":rows})
      res.render('auctions', {title: "Auctions", data: obj})
  });
});

/* GET an acution. */
router.get("/:id", (req, res, next) => {
  var sql = "select * from auctions where auctionName = ?"
  var params = [req.params.id]
  db.all(sql, params, (err, rows) => {
=======
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

/* GET an auction by id */
router.get("/:id", (req, res, next) => {
  var sql = "select * from auctions where id = ?"
  var params = [req.params.id]
  db.all(sql, params, (err, row) => {
>>>>>>> c74055557b7349cca127c4e67a1baa5004edd53e
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
<<<<<<< HEAD
          "data":rows
=======
          "data":row
>>>>>>> c74055557b7349cca127c4e67a1baa5004edd53e
      })
    });
});

<<<<<<< HEAD
router.post("/", (req, res, next) => {
  var errors = [];
  if (!req.body.auctionName){
    errors.push("No user specified");
  }
  if (!req.body.auctionDescription){
    errors.push("No bid specified");
=======
// create a new auction
router.post("/", (req, res, next) => {
  var errors = [];
  if (!req.body.auctionName){
    errors.push("No auction name specified");
>>>>>>> c74055557b7349cca127c4e67a1baa5004edd53e
  }
  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }
  var data = {
    auctionName: req.body.auctionName,
<<<<<<< HEAD
    auctionDescription: req.body.auctionDescription
  }
  var sql = 'insert into auctionss (auctionName, auctionDescription) values (?, ?)';
  var params = [data.auctionName, data.auctionDescription]
=======
  }
  var sql = 'insert into auctions (name) values (?)';
  var params = [data.auctionName]
>>>>>>> c74055557b7349cca127c4e67a1baa5004edd53e
  db.run(sql, params, function(err, result) {
    if(err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": data,
      "id" : this.lastID
    })
  });
})

<<<<<<< HEAD
module.exports = router;
=======
// delete an auction
router.delete("/:id", (req, res, next) => {
  db.run(
      'DELETE FROM auctions WHERE id = ?',
      req.params.id,
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.json({"message":"deleted", changes: this.changes})
  });
})

module.exports = router;
>>>>>>> c74055557b7349cca127c4e67a1baa5004edd53e
