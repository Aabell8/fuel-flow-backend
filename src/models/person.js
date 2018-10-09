const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  _id: String,
  name: String,
  // deviceId: String,
  drinks: Number
});

module.exports = PersonSchema;
