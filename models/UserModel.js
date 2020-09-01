const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema({
  firstName: String,
  secondName: String,
  email: String,
  userName: String,
  password: String,
  pages: [{ type: Schema.Types.ObjectId, ref: "pages" }],
  categories: [{ type: Schema.Types.ObjectId, ref: "categories" }],
  projects: [{ type: Schema.Types.ObjectId, ref: "projects" }]
});
module.exports = mongoose.model("users", UserModel);
