const express = require("express");
const router = express.Router();

//Inventory Model
const Inventory = require("../../models/Inventory");

//@route GET api/inventory
//@desc  GET All Items
//@access Public
router.get("/", (req, res, next) => {
  Inventory.find()
    .sort({ updatedAt: -1 })
    .then(inventory => res.json(inventory))
    .catch(err => console.log(err));
});

//@route GET api/inventory
//@desc  GET an Inventory by id
//@access Public
router.get("/:id", (req, res, next) => {
  Inventory.findOne({ _id: req.params.id }, req.body)
    .sort({ updateAt: -1 })
    .then(inventory => res.json(inventory))
    .catch(err => console.log(err));
});

//@route POST api/inventory
//@desc  Create an Inventory
//@access Public
router.post("/", (req, res, next) => {
  //Using ES6 destructuring
  const {
    user_name,
    item_name,
    price,
    description,
    category,
    min_stock,
    max_stock,
    units,
    quantity,
    remarks,
    partnumber,
    expiry_date,
    manufacture_date,
    waybil_no,
    location,
    purchase_type,
    supplier,
    status,
    transaction_type
  } = req.body;

  if (!item_name || item_name.length < 3) {
    //400 Bad Request
    // console.log(req.body);
    // res.status(400).send("Please fill all required fields.");
    res.status(400).send({ error: "Please fill all required fields." });
    return;
  } else {
    const newInventory = new Inventory({
      user_name,
      item_name,
      price,
      description,
      category,
      min_stock,
      max_stock,
      units,
      quantity,
      remarks,
      partnumber,
      expiry_date,
      manufacture_date,
      waybil_no,
      location,
      purchase_type,
      supplier,
      status,
      transaction_type
    });

    newInventory
      .save()
      .then(result => {
        // console.log(result);
        res.status(201).json({
          message: "Created Inventory successfully",
          newInventory,
          request: {
            type: "GET",
            url: "http://localhost:7000/api/inventory/" + result._id
          }
        });
      })
      .catch(error => {
        res
          .status(400)
          .json(error.errors)
          .send(error.errors);
        return;
      });
  }
});

//@route PUT api/inventory
//@desc  Update an inventory
//@access Public
router.put("/:id", (req, res, next) => {
  Inventory.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ success: true, message: "Updated successfuly" }))
    .catch(err =>
      res
        .status(404)
        .json({ success: false, message: "Error Updating inventory", err })
    );
});

//@route DELETE api/inventory:id
//@desc  Delete an Inventory
//@access Public
router.delete("/:id", (req, res, next) => {
  Inventory.findOneAndDelete({ _id: req.params.id })
    .then(inventory =>
      Inventory.deleteOne({ _id: req.params.id })
        .exec()
        .then(result =>
          res.json({
            result,
            success: true,
            message: "Deleted successfuly\n " + inventory
          })
        )
    )
    .catch(err =>
      res.status(500).json({
        error: err,
        success: false,
        message: "Error Deleting inventory"
      })
    );
});

module.exports = router;
