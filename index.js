// import des package
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// activation package
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost/bags");

// import des routes
const productRoutes = require("./routes/product");
app.use(productRoutes);

const productslistRoutes = require("./routes/productslist");
app.use(productslistRoutes);

const signupRoutes = require("./routes/signup");
app.use(signupRoutes);

const loginRoutes = require("./routes/login");
app.use(loginRoutes);

// const homeRoutes = require("./routes/home");
// app.use(home);
app.get("/", (req, res) => {
  res.json("je suis dans ma route");
});

app.listen(4000, () => {
  console.log("server has started");
});
