const express = require("express");
const router = express.Router();

//Inventory Model
const Inventory = require("../../models/Inventory");

//@route GET api/inventory
//@desc  GET All Items
//@access Public
router.get("/", (req, res, next) => {
  Inventory.find({})
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
router.post("/", async(req, res, next) => {
    const newInventory = new Inventory(req.body);

console.log("REQUEST BODY IS: ",req.body)
// res.status(200).json({result:req.body})
  const result =await newInventory.save().then(res =>res);
  res.json({success:true, result})  
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
