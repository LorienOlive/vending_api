const mongoose = require("mongoose");
const Schema = mongoose.Schema

const purchaseSchema = new Schema({
  item: String,
  item_id: Number,
  quantity: Number,
  money_given: Number,
  money_required: Number
}, {
  timestamps: true
});

module.exports = mongoose.model("Purchase", purchaseSchema);
