const express = require("express");
const router = express.Router();

//Item Model
const Item = require("../../models/Item");

//@route GET api/items
//@desc  GET All Items
//@access Public
router.get("/", (req, res, next) => {
  Item.find({})
    .sort({ updatedAt: -1 })
    .populate("category", "-_id category_name description status")
    .exec()
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

//@route GET api/items
//@desc  GET an Item by id
//@access Public
router.get("/:id", (req, res, next) => {
  Item.findOne({ _id: req.params.id }, req.body)
    .populate("category", "-_id category_name description status")
    .exec()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

//@route POST api/items
//@desc  Create an Item
//@access Public
router.post("/", (req, res, next) => {
  //Using ES6 destructuring
  const {
    item_name,
    price,
    description,
    category,
    min_stock,
    max_stock,
    units,
    quantity,
    remarks
  } = req.body;

  if (!item_name || item_name.length < 3) {
    //400 Bad Request
    // console.log(req.body);
    res
      .status(400)
      .send("Item name is required and should be minimum 3 characters");
    return;
  }

  const newItem = new Item({
    item_name,
    price,
    description,
    category,
    min_stock,
    max_stock,
    units,
    quantity,
    remarks
  });

  newItem
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Item successfully",
        createdItem: {
          item_name,
          price,
          description,
          category,
          min_stock,
          max_stock,
          units,
          quantity,
          remarks,
          request: {
            type: "GET",
            url: "http://localhost:5000/api/items/" + result._id
          }
        }
      });
    })
    .catch(err => console.log(err));
  res.status(201).json({
    message: "Handling POST requests to /items",
    createdItem: newItem
  });
});

//@route PUT api/items
//@desc  Update an Item
//@access Public
router.put("/:id", (req, res, next) => {
  Item.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ success: true, message: "Updated successfuly" }))
    .catch(err =>
      res
        .status(404)
        .json({ success: false, message: "Error Updating item", err })
    );
});

//@route DELETE api/items:id
//@desc  Delete an Item
//@access Public
router.delete("/:id", (req, res, next) => {
  Item.findOneAndDelete({ _id: req.params.id })
    .then(item =>
      Item.deleteOne({ _id: req.params.id })
        .exec()
        .then(result =>
          res.json({ result, success: true, message: "Deleted successfuly" })
        )
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: err, success: false, message: "Error Deleting item" })
    );
});

module.exports = router;
