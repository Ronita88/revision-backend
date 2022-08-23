const mongoose = require("mongoose");

//creation du model Products

const Products = mongoose.model("Product", {
  product_name: String,
  product_description: String,
  product_price: Number,
});

module.exports = Products;
