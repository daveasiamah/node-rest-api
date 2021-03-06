const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");
const moment = require("moment");
const createdDate = moment().format("llll");
const updatedDate = moment().format("llll");

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User" //referencing the User model (ref:'case-sensitive')
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  date_created: {
    type: String,
    default: createdDate
  },
  date_updated: {
    type: String,
    default: updatedDate
  }
  // skillset: {
  //   type: [String],

  // },
  // bio: {
  //   type: String
  // },
  // githubusername: {
  //   type: String
  // },
  // experience: [
  //   {
  //     title: {
  //       type: String,
  //       required: true
  //     },
  //     company: {
  //       type: String,
  //       required: true
  //     },
  //     location: {
  //       type: String
  //     },
  //     from: {
  //       type: Date,
  //       required: true
  //     },
  //     to: {
  //       type: Date
  //     },
  //     current: {
  //       type: Boolean,
  //       default: false
  //     },
  //     description: {
  //       type: String
  //     }
  //   }
  // ],
  // education: [
  //   {
  //     school: {
  //       type: String,
  //       required: true
  //     },
  //     degree: {
  //       type: String,
  //       required: true
  //     },
  //     fieldofstudy: {
  //       type: String,
  //       required: true
  //     },
  //     from: {
  //       type: Date,
  //       required: true
  //     },
  //     to: {
  //       type: Date
  //     },
  //     current: {
  //       type: Boolean,
  //       default: false
  //     },
  //     description: {
  //       type: String
  //     }
  //   }
  // ],
  // social: {
  //   youtube: {
  //     type: String
  //   },
  //   twitter: {
  //     type: String
  //   },
  //   facebook: {
  //     type: String
  //   },
  //   linkedin: {
  //     type: String
  //   },
  //   instagram: {
  //     type: String
  //   }
  // },
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
});

ProfileSchema.plugin(timestamp);
module.exports = Profile = mongoose.model("Profile", ProfileSchema);
