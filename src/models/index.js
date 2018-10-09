const mongoose = require("mongoose");

const PartySchema = require("./party.js");
const PersonSchema = require("./person.js");

Party = mongoose.model("Party", PartySchema);
Person = mongoose.model("Person", PersonSchema);
module.exports = { Party, Person };
