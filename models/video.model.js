const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    course_id: {
      type: mongoose.Schema.ObjectId,
      ref: "course",
      required: true,
    },
    comments:[
      {
        type:mongoose.Schema.ObjectId,
        ref:"comment"
      }
    ]
  },
  { timestamps: true }
);

const videoModel = mongoose.model("video", videoSchema);

module.exports = videoModel;
