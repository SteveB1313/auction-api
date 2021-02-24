var express = require('express');
const { InsufficientStorage } = require('http-errors');
const db = require('../database');

var router = express.Router();

/* GET all auctions */
router.get("/", (req, res, next) => {
  var sql = "select * from auctions"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({"message":"success", "data":rows })
      //res.render('auctions', {'title':'Auctions', "data":rows })
    
    });
});

/* GET an auction by id */
router.get("/:id", (req, res, next) => {
  var sql = "select * from bids where auctionName = ?"
  var params = [req.params.id]
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      // res.json({ "message":"success", "data":row })
      res.render('auctionDetail', {"data": rows})

    });
});

// create a new auction
router.post("/", (req, res, next) => {
  var errors = [];
  if (!req.body.auctionName){
    errors.push("No auction name specified");
  }
  if (!req.body.auctionDescription){
    errors.push("No auction description specified");
  }
  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }
  var data = {
    auctionName: req.body.auctionName,
    auctionDescription: req.body.auctionDescription,
  }
  var sql = 'insert into auctions (auctionName, auctionDescription) values (?,?)';
  var params = [data.auctionName, data.auctionDescription]
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
