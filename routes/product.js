const express = require("express");
const router = express.Router();

const Product = require("../models/Product.js");

// pour poster un produits je dois créer un model
router.post("/products", async (req, res) => {
  const product = req.body;
  try {
    const newProduct = new Product({
      product_name: product.name,
      product_description: product.description,
      product_price: product.price,
    });
    await newProduct.save();
    res.json({ newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
