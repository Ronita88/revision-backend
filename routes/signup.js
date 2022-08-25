const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const Signup = require("../models/Signup");

router.post("/signup", async (req, res) => {
  try {
    if (req.body.username === undefined) {
      res.status(400).json({ message: "Missing parameter" });
    } else {
      const isEmailAlreadyExistinDb = await Signup.findOne({
        email: req.body.email,
      });
      if (isEmailAlreadyExistinDb !== null) {
        res.json({ message: "This email already has an account" });
      } else {
        // etape 1= hash du mdp
        const salt = uid2(16);
        const hash = SHA256(req.body.password + salt).toString(encBase64);
        const token = uid2(32);
        console.log("salt==>", salt);
        console.log("hash==>", hash);

        //etape 2= création d'un nouveau compte
        const newCount = new Signup({
          email: req.body.email,
          account: {
            username: req.body.username,
          },
          newsletter: req.body.newsletter,
          token: token,
          hash: token,
          salt: salt,
        });

        // etape 3= enregistrement dans BDD
        await newCount.save();
        res.json({
          _id: newCount._id,
          email: newCount.email,
          token: newCount.token,
          account: newCount.account,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
