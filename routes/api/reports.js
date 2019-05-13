const express = require("express");
const router = express.Router();

const Report = require("../../models/Report");

//@route GET api/reports
//@desc  GET All Reports
//@access Public
router.get("/", (req, res, next) => {
  Report.find()
    .sort({ updatedAt: -1 })
    .populate("item", "-_id category description")
    .exec()
    .then(report => res.json(report))
    .catch(err => console.log(err));
});

router.post("/api/reports", (req, res, next) => {
  const {
    item_name,
    price,
    category,
    units,
    user_name,
    transaction_date,
    supplier,
    purchase_type,
    description,
    country,
    city,
    manufacture_date,
    expiry_date
  } = req.body;

  if (!item_name || item_name < 3) {
    res.status(400).json({ message: "Please fill all fields!" });
    return;
  }

  const newReport = new Report({
    price,
    category,
    units,
    user_name,
    transaction_date,
    supplier,
    purchase_type,
    description,
    country,
    city,
    manufacture_date,
    expiry_date
  });

  newReport
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Successfully!",
        createdReport: {
          newReport,
          request: {
            type: "GET",
            url: "http://localhost:7000/api/reports/" + result._id
          }
        }
      });
    })
    .catch(err => {
      res.json(err), console.log(err);
    });
});
module.exports = router;
