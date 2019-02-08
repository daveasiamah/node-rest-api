const express = require("express");
const router = express.Router();

//Order Model
const Order = require("../../models/Order");

//@route GET api/orders
//@desc  GET All Orders
//@access Public
router.get("/", (req, res, next) => {
  Order.find({})
    .sort({ updatedAt: -1 }) //Sort descending
    .then(orders => res.json(orders))
    .catch(err => console.log(err));
});

//@route GET api/orders
//@desc  GET an Order by id
//@access Public
router.get("/:id", (req, res) => {
  Order.find({ _id: req.params.id }, req.body)
    .then(orders => res.json(orders))
    .catch(err => console.log(err));
});

//@route POST api/orders
//@desc  Create an Order
//@access Public
router.post("/", (req, res, next) => {
  //Using ES6 destructuring
  const {
    order_name,
    price,
    description,
    min_stockLevel,
    unit_ofMeasure,
    category_id,
    remarks
  } = req.body;

  if (!order_name || order_name < 3) {
    //400 Bad Request
    res
      .status(400)
      .send("Order name is required and should be minimum 3 characters");
    return;
  }

  const newOrder = new Order({
    order_name,
    price,
    description,
    min_stockLevel,
    unit_ofMeasure,
    category_id,
    remarks
  });

  newOrder
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Order successfully",
        createdOrder: {
          order_name,
          price,
          description,
          min_stockLevel,
          unit_ofMeasure,
          category_id,
          remarks,
          request: {
            type: "GET",
            url: "http://localhost:5000/api/orders/" + result._id
          }
        }
      });
    })
    .catch(err => console.log(err));
  // res
  //   .status(201)
  //   .json({ message: "Handling POST requests to /orders", createdOrder: order });
});

//@route PUT api/orders
//@desc  Update an Order
//@access Public
router.put("/:id", (req, res) => {
  Order.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ success: true, message: "Updated successfuly" }))
    .catch(err =>
      res.status(404).json({ success: false, message: "Error Updating order" })
    );
});

//@route DELETE api/orders:id
//@desc  Delete an Order
//@access Public
router.delete("/:id", (req, res, next) => {
  Order.findOneAndDelete(req.params.id)
    .then(order =>
      order
        .deleteOne({ _id: req.params.id })
        .exec()
        .then(result =>
          res.json({ result, success: true, message: "Deleted successfuly" })
        )
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: err, success: false, message: "Error Deleting order" })
    );
});

module.exports = router;
