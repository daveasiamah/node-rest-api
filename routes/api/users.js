const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");
const validate = require("../../models/User");

//@route GET api/users
//@desc  GET All Users
//@access Public
router.get("/", (req, res, next) => {
  User.find({})
    .sort({ updatedAt: -1 })
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

//@route GET api/users
//@desc  GET an User by id
//@access Public
router.get("/:id", (req, res, next) => {
  User.findOne({ _id: req.params.id }, req.body)
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

//Create user
router.post("/", async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if this user already exisits
  let user = await User.findOneAndUpdate({ email: req.body.email }, req.body);
  if (user) {
    return res.status(400).send("That user already exisits!");
  } else {
    // Insert the new user if they do not exist yet
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user
      .save()
      .then(result => {
        res.status(201).json({
          message: "Created successfuly!",
          createdUser: { user },
          request: "http://localhost:5000/api/users/" + result._id
        });
      })
      .catch(error => {
        console.log(error);
      });

    const token = jwt.sign({ _id: user._id }, config.get("PrivateKey"));
    res.header("x-auth-token", token).send(user);

    // res.send({ user });
  }
});

//@route PUT api/users
//@desc  Update an User
//@access Public
router.put("/:id", (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(async () => {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    })
    .then(() => res.json({ message: "Updated successfuly" }))
    .catch(err =>
      res
        .status(404)
        .json({ success: false, message: "Error Updating user", err })
    );
});

//@route DELETE api/users:id
//@desc  Delete an User
//@access Public
router.delete("/:id", (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then(user =>
      User.deleteOne({ _id: req.params.id })
        .exec()
        .then(result =>
          res.json({
            ...result.ok,
            success: true,
            message: "Deleted successfuly"
          })
        )
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: err, success: false, message: "Error Deleting user" })
    );
});

module.exports = router;
