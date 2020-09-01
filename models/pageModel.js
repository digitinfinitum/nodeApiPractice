const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PageModel = new Schema({
  name: String,
  content: String,
  slug: String
});
module.exports = mongoose.model("pages", PageModel);
