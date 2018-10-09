const express = require("express");
const router = express.Router();

const { Person } = require("../models");

// Get people route
router.get("/", async function(req, res) {
  const query = await Person.find({}).exec();
  res.json(query);
});

// Post people route
router.post("/", function(req, res) {
  Person.create({ name: "Austin", drinks: 2 }, function(err, person) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(person);
    }
  });
});

module.exports = router;
