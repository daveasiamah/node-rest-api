const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const config = require("config");
const passport = require("passport");
const router = express.Router();
const app = express();

if (!config.get("PrivateKey")) {
  console.error("FATAL ERROR: PrivateKey is not defined.");
  process.exit(1);
}

//Declare Routes
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const login = require("./routes/api/login");
const categories = require("./routes/api/categories");
const suppliers = require("./routes/api/suppliers");
const inventory = require("./routes/api/inventory");
const profiles = require("./routes/api/profiles");
const reports = require("./routes/api/reports");

//Logging Requests to Server
app.use(morgan("dev"));

//Use CORS : Handle requests from fontend clients
app.use(cors());

// Access Controls
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   // if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   // }
// });

app.use("/uploads", express.static("uploads"));

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Passport Middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//DB Config
const db = require("./config/keys").mongodbURI;

//Connect to MongoDB
mongoose.set("useCreateIndex", true);

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;

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
    Message: "Server running successfuly!"
  })
);

router.get("/api", (req, res) =>
  res.json({
    status: "ok",
    Message: "Welcome to EPS-IMS API!"
  })
);

app.all("*", (req, res) => {
  console.log("Error: Route not found.");
  return res.sendStatus(404);
});

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Server started on port ${port}`));
