const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// const morgan = require("morgan");
const config = require("config");
const passport = require("passport");
const router = express.Router();
const app = express();

if (!config.get("PrivateKey")) {
  console.error("FATAL ERROR: PrivateKey is not defined.");
  process.exit(1);
}

const items = require("./routes/api/items");
const users = require("./routes/api/users");
const login = require("./routes/api/login");
const categories = require("./routes/api/categories");
const suppliers = require("./routes/api/suppliers");
const inventory = require("./routes/api/inventory");
const profiles = require("./routes/api/profiles");
const reports = require("./routes/api/reports");

//Logging Requests to Server
// app.use(morgan("dev"));
app.use(cors());

// Access Controls
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use(passport.initialize());
require("./config/passport")(passport);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//Use Routes
app.use("/", router);
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/login", login);
app.use("/api/categories", categories);
app.use("/api/suppliers", suppliers);
app.use("/api/inventory", inventory);
app.use("/api/profiles", profiles);
app.use("/api/reports", reports);

/** GET /api-status - Check service status **/
router.get("/", (req, res) =>
  res.json({
    status: "ok",
    Message: "Server running successfuly!",
  })
);

router.get("/api", (req, res) =>
  res.json({
    status: "ok",
    Message: "Welcome to EPS-IMS API!",
  })
);

app.all("*", (req, res) => {
  console.log("Error: Route not found.");
  return res.sendStatus(404);
});

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Server started on port ${port}`));
