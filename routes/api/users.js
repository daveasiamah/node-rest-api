const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("config");

const User = require("../../models/User");
const validate = require("../../models/User");

//@route GET api/users
//@desc  GET All Users
//@access Public
router.get("/", (req, res, next) => {
  User.find({})
    .sort({ updatedAt: -1 })
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

//@route GET api/current
//@desc  GET current user
//@access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ id: req.user._id, name: req.user.name, email: req.user.email });
  }
);

//@route GET api/users
//@desc  GET an User by id
//@access Public
router.get("/:id", async (req, res, next) => {
  await User.findOne({ _id: req.params.id }, req.body)
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

//Create user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email }, req.body);
  if (user) {
    return res.status(400).send("That user already exisits!");
  } else {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
      console.log(error);
    }

    await user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Created successfuly!",
          createdUser: { user },
          request: `${process.env.BASE_SERVER_URI}/api/users/` + result._id,
        });
      })
      .catch((error) => {
        res.status(400).send({ Error: error });
      });
  }
});

//@route DELETE api/users:id
//@desc  Delete an User
//@access Public
router.delete("/:id", (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((user) =>
      User.deleteOne({ _id: req.params.id })
        .exec()
        .then((result) =>
          res.json({
            ...result.ok,
            success: true,
            message: "Deleted successfuly",
          })
        )
    )
    .catch((err) =>
      res.status(500).json({ error: err, message: "Error Deleting user" })
    );
});

module.exports = router;
