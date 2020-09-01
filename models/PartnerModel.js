const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const parntersModel = new Schema({
  name: String,
  image: String,
  link: String
});
module.exports = mongoose.model("partners", parntersModel);
