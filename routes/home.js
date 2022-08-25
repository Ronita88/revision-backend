// n'a pas l'air de marcher

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("je suis dans ma route");
});

module.exports = router;
