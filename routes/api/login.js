const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/keys");
const User = require("../../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  // First Validate The HTTP Request
  const { error } = validate(req.body);
  if (error) {
    // return res.status(400).send(error.details[0].message);
    return res
      .status(400)
      .json({ message: "Invalid user details, Please check and try again." });
  }

  // Find the user by their email address
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    // return res.status(400).send("Incorrect email or password.")
    return res.status(401).json({ message: "Incorrect email or password." });
  }

  // Then validate the Credentials in MongoDB that match
  // those provided in the request
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Incorrect email or password." });
  }

  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.SECRET_OR_KEY,
    {
      expiresIn: 3600,
    }
  );

  res.json({ Token: "Bearer " + token });
});

const validate = (req) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
};

module.exports = router;
