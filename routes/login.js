const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const Signup = require("../models/Signup");

//Route pour me connecter à un compte
router.post("/login", async (req, res) => {
  try {
    const userToCheck = await Signup.findOne({ email: req.body.email });
    if (userToCheck === null) {
      res.status(401).json({ message: "Unauthorized 1" });
    } else {
      const newHash = SHA256(req.body.password + userToCheck.salt).toString(
        encBase64
      );
      console.log("newHash ==>", newHash);
      console.log("Hash présent en BDD ==>", userToCheck.hash);

      //on vient comparer notre nouveau hash à celui présent en BDD
      if (newHash === userToCheck.hash) {
        res.json({
          _id: userToCheck._id,
          token: userToCheck.token,
          account: userToCheck.account,
        });
      } else {
        res.status(401).json({ message: "Unauthorized 2" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
