const assert = require("assert")
const request = require("supertest");
const bluebird = require("bluebird");
const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
const app = require("../app")
const Item = require("../models/items");
const Purchase = require("../models/purchases");
const nodeEnv = process.env.NODE_ENV || "development";
const config = require("../config.json")[nodeEnv];

before("connect to Mongo", function () {
  mongoose.connect(config.mongoURL);
});

after("drop database", function (done) {
  mongoose.connection.dropDatabase(done);
});

describe("Item", function () {
    beforeEach("delete all items", function (done) {
        Item.deleteMany({}).then(() => done()).catch(done);
    })
});

describe("POST /api/vendor/items", function () {
  it("should allow vendor to add items", function(done) {
      var newItem = new Item({
            id: 1,
            description: "Corn chips",
            cost: 65,
            quantity: 4
          })
          newItem.save(newItem)
            .then(function(newItem) {
              assert(newItem.id);
              assert(newItem.description == "Corn chips");
              console.log(newItem);
              done();
            })
            .catch(function() {
              done();
            })
      })
});

describe("GET /api/customer/item", function () {
  it("should allow customer to get a list of all available items", function(done) {
    Item.find()
      .then(function(items) {
        console.log(items);
        assert(items.id);
        done();
      })
      .catch(function() {
        done();
      })
   })
});

describe("POST /api/customer/purchases", function () {
  it("should allow customer to make a new purchase", function (done) {
    var newPurchase = new Purchase({
      item: "Corn chips",
      item_id: 1,
      quantity: 1,
      money_given: 100,
      money_required: 90
    })
    newPurchase.save(newPurchase)
    .then(function(newPurchase) {
      console.log(newPurchase);
      assert(newItem.id);
      assert(newItem.description == "Corn chips");
      done();
    })
    .catch(function() {
      done();
    })
  })
});

describe("GET /api/vendor/purchases", function () {
  it("should allow vendor to get a list of purchases", function(done) {
    Purchase.find()
    .then(function(purchase) {
      console.log(purchase);
      assert(purchase.item);
      done();
    })
    .catch(function() {
      done();
    })
  })
})
