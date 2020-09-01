const express = require("express");
const app = express();

const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const cors  = require('cors')

// routers
const PagesRouter = require("./routes/PagesRouter");
const CategoriesRouter = require("./routes/CategoriesRouter");
const PartnersRouter = require("./routes/PartnersRouter");
const ProjectsRouter = require("./routes/ProjectsRouter");
const UsersRouter = require("./routes/UsersRouter");
const port = process.env.PORT || 8000;
//enable cors for all the api
app.use(cors())

//intialize dotEnv
dotEnv.config();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(logger("dev"));
mongoose.Promise = global.Promise;
//connection to mongodb
mongoose.connect(process.env.dbConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//mongodb configutations
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

//use the routes midlwares
app.use("/api/pages", PagesRouter);
app.use("/api/categories", CategoriesRouter);
app.use("/api/partners", PartnersRouter);
app.use("/api/projects", ProjectsRouter);
app.use("/api/users", UsersRouter);
app.use( (req, res, next)=> {
  // Allow Origins
  res.header("Access-Control-Allow-Origin", "*");
  // Allow Methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  // Allow Headers
  res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization");
  // Handle preflight, it must return 200
  if (req.method === "OPTIONS") {
    // Stop the middleware chain
    return res.status(200).end();
  }
  // Next middleware
  next();
});

//handle 404 erreurs then pass it to the error handler function
app.use((request, response, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use((err, request, response, next) => {
  const error = app.get("env") === "developement" ? err : {};
  const status = err.status || 500;
  response.status(status).json({
    message: error.message
  });
  //show the error in the console
  console.error(err);
});
app.get("/", (req, res) => {

  res.send("Api Working!");
});

app.listen(port, () => {
  console.log(`server runing on ${port}`);
});
