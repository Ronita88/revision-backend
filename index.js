// import des package
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// activation package
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost/bags");
// import du model Products pour la BDD
const Product = require("./models/Product");

// pour poster un produits je dois créer un model
app.post("/products", async (req, res) => {
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

// route read pour lire les données de la BDD bags sur mongo DB
app.get("/productslist", async (req, res) => {
  try {
    //création de la variable Products pour avoir l'ensemble des articles, qu'on va chercher d'après le model BDD Product
    //.sort permet de trier par ordre alphabétique

    let limit = 4;
    if (req.query.limit) {
      limit = req.query.limit;
    }

    let page = 1;
    if (req.query.page) {
      page = req.query.page;
    }

    console.log(limit);
    console.log(skip);
    const products = await Product.find()
      .sort({
        product_name: "asc",
        product_price: "asc",
      })
      .limit(limit)
      .skip((page - 1) * limit);

    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.json("je suis dans ma route");
});

app.listen(4000, () => {
  console.log("server has started");
});
