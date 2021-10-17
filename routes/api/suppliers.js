const express = require("express");
const router = express.Router();
const Supplier = require("../../models/Supplier");

//@route GET api/suppliers
//@desc  GET All uppliers
//@access Public
router.get("/", (req, res, next) => {
  Supplier.find({})
    .sort({ updatedAt: -1 }) //Sort descending
    .then((suppliers) => res.json(suppliers))
    .catch((err) => console.log(err));
});

//@route GET api/suppliers
//@desc  GET an Supplier by id
//@access Public
router.get("/:id", (req, res) => {
  Supplier.find({ _id: req.params.id }, req.body)
    .then((supplier) => res.json(supplier))
    .catch((err) => console.log(err));
});

//@route POST api/suppliers
//@desc  Create an Supplier
//@access Public
router.post("/", (req, res, next) => {
  //Using ES6 destructuring
  const {
    supplier_name,
    phone,
    email,
    address,
    country,
    city,
    remarks,
    status,
  } = req.body;

  if (!supplier_name || supplier_name.length < 3) {
    //400 Bad Request
    console.log(req.body);
    res
      .status(400)
      .send("Supplier name is required and should be minimum 3 characters");
    return;
  }

  const newSupplier = new Supplier({
    supplier_name,
    phone,
    email,
    address,
    country,
    city,
    remarks,
    status,
  });

  newSupplier
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created Supplier successfully",
        createdSupplier: {
          supplier_name,
          phone,
          email,
          address,
          country,
          city,
          remarks,
          status,
          request: {
            type: "GET",
            url: "http://localhost:7000/api/suppliers/" + result._id,
          },
        },
      });
    })
    .catch((err) => console.log(err));
  // res
  //   .status(201)
  //   .json({ message: "Handling POST requests to /suppliers", createdSupplier: supplier });
});

//@route PUT api/suppliers
//@desc  Update an Supplier
//@access Public
router.put("/:id", (req, res) => {
  Supplier.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ success: true, message: "Updated successfuly" }))
    .catch(
      (err) => console.log(err),
      res
        .status(404)
        .json({ success: false, message: "Error Updating supplier" })
    );
});

//@route DELETE api/suppliers:id
//@desc  Delete an Supplier
//@access Public
router.delete("/:id", (req, res, next) => {
  Supplier.findOneAndDelete({ _id: req.params.id })
    .then((supplier) =>
      Supplier.deleteOne({ _id: req.params.id })
        .exec()
        .then((result) =>
          res.json({ result, success: true, message: "Deleted successfuly" })
        )
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
        success: false,
        message: "Error Deleting supplier",
      })
    );
});

module.exports = router;
