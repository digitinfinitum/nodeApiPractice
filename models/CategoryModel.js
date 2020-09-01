const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategoryModel = new Schema({
  name: String,
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "projects"
    }
  ],
  slug: String
});
module.exports = mongoose.model("categories", CategoryModel);
