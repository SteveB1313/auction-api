var express = require('express');
const { InsufficientStorage } = require('http-errors');
const db = require('../database');

var router = express.Router();

/* GET bid listing. */
router.get("/", (req, res, next) => {
  var sql = "select * from auctions"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

router.post("/", (req, res, next) => {
  var errors = [];
  if (!req.body.auctionName){
    errors.push("No auction name specified");
  }
  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }
  var data = {
    auctionName: req.body.auctionName,
  }
  var sql = 'insert into auctions (name) values (?)';
  var params = [data.auctionName]
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