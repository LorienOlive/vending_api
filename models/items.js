const mongoose = require("mongoose");
const Schema = mongoose.Schema

const itemSchema = new Schema({
      id: Number,
      description: String,
      cost: Number,
      quantity: Number
});

module.exports = mongoose.model("Item", itemSchema);
