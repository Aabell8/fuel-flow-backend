const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = require("./person.js");

const PartySchema = new Schema({
  _id: String,
  people: { type: [PersonSchema], default: [] },
  createdAt: Date
});

PartySchema.pre("save", next => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

// module.exports = mongoose.model("Person", PersonSchema);
module.exports = PartySchema;
