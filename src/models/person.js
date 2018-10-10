const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  _id: String,
  name: String,
  isRequesting: Boolean,
  drinks: Number
});

module.exports = PersonSchema;
