const express = require("express");
const router = express.Router();

const { Party } = require("../models");

// Post new party room
router.post("/", function(req, res) {
  const id = Math.random()
    .toString(36)
    .substr(2, 4)
    .toUpperCase();
  Party.create({ _id: id }, function(err, party) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(party);
    }
  });
});

// Get party by id
router.get("/:id", async function(req, res) {
  const party = await Party.findById(req.params.id).exec();
  if (party) {
    res.json({ party });
  } else {
    res.status(204).json({ party });
  }
});

module.exports = router;
