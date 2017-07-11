const express = require("express");
const app = express();
const bluebird = require("bluebird");
const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
const Item = require("./models/items");
const Purchase = require("./models/purchases");
const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config.json")[nodeEnv];

// mongoose.connect(config.mongoURL);

app.post('/api/vendor/items', function (req, res) {
  var newItem = new Item({
      id: 1,
      description: "Corn chips",
      cost: 65,
      quantity: 4
    })
    newItem.save(newItem)
      .then(function (newItem) {
    res.status(201).json(newItem.toJSON());
  })
});

app.get('/api/customer/items', function (req, res) {
  Item.find()
    .then(function (item) {
        res.json(item);
    })
})

app.post('/api/customer/purchases', function (req, res) {
  var newPurchase = new Purchase({
    item: "Corn chips",
    item_id: 1,
    quantity: 1,
    money_given: 100,
    money_required: 90
  })
  newPurchase.save(newPurchase)
    .then(function (newPurchase) {
    res.status(201).json(newPurchase.toJSON());
    })
})

app.get('/api/vendor/purchases', function (req, res) {
    Purchase.find()
      .then(function (purchase) {
        res.json(purchase);
      })
})

app.post('/api/customer/items/:itemId/purchases', function (req, res) {
  Purchase.find({item_id: 1})
    .then(function (purchase) {
      res.json(purchase);
    })
})

app.listen(3000, function(){
  console.log("Successfully started express application!")
});

module.exports = app;
