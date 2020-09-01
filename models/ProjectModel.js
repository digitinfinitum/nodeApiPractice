const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProcjectModel = new Schema({
  name: String,
  description: String,
  image: String,
  link: String,
  category: { type: Schema.Types.ObjectId, ref: "categories" },
  slug: String
});
module.exports = mongoose.model("projects", ProcjectModel);
