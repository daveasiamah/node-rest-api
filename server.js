const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const config = require("config");

const router = express.Router();

const app = express();

if (!config.get("PrivateKey")) {
  console.error("FATAL ERROR: PrivateKey is not defined.");
  process.exit(1);
}

//Declare Routes
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const categories = require("./routes/api/categories");
const customers = require("./routes/api/customers");
const suppliers = require("./routes/api/suppliers");
const orders = require("./routes/api/orders");
const products = require("./routes/api/products");
const inventory = require("./routes/api/inventory");

//Logging Requests to Server
app.use(morgan("dev"));

//Use CORS : Handle requests from fontend clients
app.use(cors());

//Access Controls
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/uploads", express.static("uploads"));

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DB Config
const db = require("./config/keys").mongodbURI;

//Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Use Routes
app.use("/", router);
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/categories", categories);
app.use("/api/customers", customers);
app.use("/api/suppliers", suppliers);
app.use("/api/orders", orders);
app.use("/api/products", products);
app.use("/api/inventory", inventory);

app.all("*", (req, res) => {
  console.log("Returning a 404 from the catch-all route");
  return res.sendStatus(404);
});

//Handle Unknown routes Errors
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//Handle All other Errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
  next(error);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
