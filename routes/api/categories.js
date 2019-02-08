const express = require("express");
const router = express.Router();

//Categories Model
const Category = require("../../models/Category");

//@route GET api/categories
//@desc  GET All Categories
//@access Public
router.get("/", (req, res) => {
  Category.find({})
    .sort({ updatedAt: -1 }) //Sort descending
    .then(categories => res.json(categories))
    .catch(err => console.log(err));
});

//@route GET api/category
//@desc  GET an Category by id
//@access Public
router.get("/:id", (req, res) => {
  Category.findOne({ _id: req.params.id }, req.body)
    .then(category => res.json(category))
    .catch(err => console.log(err));
});

//@route POST api/categories
//@desc  Create a Category
//@access Public
router.post("/", (req, res) => {
  //Using ES6 destructuring
  const { category_name, description, status } = req.body;
  if (!category_name) {
    //400 Bad Request
    res.status(400).send("Category name is required");
    return;
  }
  const newCategory = new Category({
    category_name,
    description,
    status
  });

  newCategory
    .save()
    .then(category =>
      res.json({ category, message: "Category saved successfuly" })
    );
});

//@route UPDATE api/categories:id
//@desc  Update a Categories
//@access Public
router.put("/:id", (req, res) => {
  Category.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ succes: true, message: "Updated Successfully" }))
    .catch(err =>
      res
        .status(404)
        .json({ success: false, message: "Error updating category", err })
    );
});

//@route DELETE api/Categories:id
//@desc  Delete a Category
//@access Public
router.delete("/:id", (req, res) => {
  Category.findById(req.params.id)
    .then(category =>
      category
        .remove()
        .then(() =>
          res.json({ success: true, message: "Deleted successfully" })
        )
    )
    .catch(err =>
      res
        .status(404)
        .json({ success: false, message: "Error Deleting category", err })
    );
});

module.exports = router;
