const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

const app = express();

//Use mongoose to connect to MongoDB
let mongodbUri = "mongodb://localhost:27017/ims-pos";
mongoose.connect(
  mongodbUri,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  // db.collection("users").find();
  // console.log(db.collection("users").find("user1"));
  console.log("Loaded Data from MongoDB!");
});

//Connect to MongoDB database
// let mongodbUri = "mongodb://localhost:27017/ims-pos";
// MongoClient.connect(
//   mongodbUri,
//   { useNewUrlParser: true },
//   (err, client) => {
//     if (err) throw err;

//     let db = client.db("ims-pos");

//     db.collection("users")
//       .find()
//       .toArray((err, result) => {
//         if (err) throw err;

//         // console.log(result);
//         let appUser = result;
//         appUser;
//       });
//   }
// );

//Static data load
let customersUrl = "/api/customers";
app.get(customersUrl, (req, res) => {
  let customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Steve", lastName: "Smith" },
    { id: 2, firstName: "Mary", lastName: "Swanson" }
  ];
  res.json(customers);
  console.log(customers);
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
