const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    videos:[
      {
        type:mongoose.Schema.ObjectId,
        ref:"video"
      }
    ]
  },
  { timestamps: true }
);

const courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel;
