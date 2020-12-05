const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  dataCollection: Number,
  date: String,
  createdAt: {type:Date, default: Date.now},
  products: [
    { name: String ,
      value: Number
  }]
});

const historicPrice = mongoose.model('historical_prices', schema)

module.exports = {
  historicPrice
}