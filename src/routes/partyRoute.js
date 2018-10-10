const express = require("express");
const router = express.Router();

const { Party, Person } = require("../models");

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
    res.json(party);
  } else {
    res.status(204).json(party);
  }
});

// Add person to party
router.put("/:id/people", async function(req, res) {
  console.log(req.params.id);
  const party = await Party.findById(req.params.id).exec();
  console.log(party);
  if (party) {
    party.people.push(
      new Person({
        _id: req.body.id,
        name: req.body.name,
        drinks: 0
      })
    );
    party.save(function(err, party) {
      if (err) {
        res.status(500).json(party);
      } else {
        res.json(party);
      }
    });
  } else {
    res.status(500).json({ error: "No party exists with this id" });
  }
});

module.exports = router;
