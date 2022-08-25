const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// route read pour lire les données de la BDD bags sur mongo DB
router.get("/productslist", async (req, res) => {
  try {
    //création de la variable Products pour avoir l'ensemble des articles, qu'on va chercher d'après le model BDD Product
    //.sort permet de trier par ordre alphabétique

    const filter = {}; // pour connaitre le nombre d'articles total

    let limit = 4;
    if (req.query.limit) {
      limit = req.query.limit;
    }

    let page = 1;
    if (req.query.page) {
      page = req.query.page;
    }

    console.log(limit);
    console.log(page);
    const products = await Product.find(filter)
      .sort({
        product_name: "asc",
        product_price: "asc",
      })
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await Product.countDocuments(filter);
    console.log(count);
    // res.json(products); // pour retourner l'ensemble des données de la BDD

    // const count = await Product.countDocuments(filter);
    res.json({ count, products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
