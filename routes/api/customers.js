const express = require("express");
const router = express.Router();

//Customer Model
const Customer = require("../../models/Customer");

//@route GET api/customers
//@desc  GET All Customers
//@access Public
router.get("/", (req, res, next) => {
  Customer.find({})
    .sort({ updatedAt: -1 }) //Sort descending
    .then(customers => res.json(customers))
    .catch(err => console.log(err));
});

//@route GET api/customers
//@desc  GET a Customer by id
//@access Public
router.get("/:id", (req, res) => {
  Customer.find({ _id: req.params.id }, req.body)
    .then(customer => res.json(customer))
    .catch(err => console.log(err));
});

//@route POST api/customers
//@desc  Create a Customer
//@access Public
router.post("/", (req, res, next) => {
  //Using ES6 destructuring
  const { customer_name, phone, email, address, country, remarks } = req.body;
  if (!customer_name || customer_name < 3) {
    //400 Bad Request
    res
      .status(400)
      .send("Customer name is required and should be minimum 3 characters");
    return;
  }

  const newCustomer = new Customer({
    customer_name,
    phone,
    email,
    address,
    country,
    remarks
  });

  newCustomer
    .save()
    .then(customer => res.json({ customer, message: "Saved successfuly" }))
    .catch(err => console.log(err));
});

//@route PUT api/customers
//@desc  Update a Customer
//@access Public
router.put("/:id", (req, res) => {
  Customer.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ success: true, message: "Updated successfuly" }))
    .catch(err =>
      res
        .status(404)
        .json({ success: false, message: "Error updating customer" })
    );
});

//@route DELETE api/customers:id
//@desc  Delete a Customer
//@access Public
router.delete("/:id", (req, res, next) => {
  Customer.findOneAndDelete({ _id: req.params.id })
    .then(customer =>
      Customer.deleteOne({ _id: req.params.id })
        .exec()
        .then(result =>
          res.json({ result, success: true, message: "Deleted successfuly" })
        )
    )
    .catch(err =>
      res.status(500).json({
        error: err,
        success: false,
        message: "Error Deleting customer"
      })
    );
});

module.exports = router;
