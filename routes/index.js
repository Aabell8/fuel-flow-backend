const express = require("express");
const router = express.Router();

const { Party, Person } = require("../models");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("Imgay");
});

module.exports = router;
