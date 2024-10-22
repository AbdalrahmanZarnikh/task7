const commentModel = require("../models/comment.model");
const courseModel = require("../models/course.model");
const userModel = require("../models/user.model");
const videoModel = require("../models/video.model");




const GetAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find().populate("user_id").populate("videos");
    res.status(200).json({ status: "Success", data: courses });
  } catch (error) {
    res.status(500).json({ status:"Error",message: error.message });
  }
};


const GetCourse = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id).populate("user_id").populate("videos");
    if(!course){
        res.status(404).json({ status:"Fail",message: "Course Not Found" });
    }
    res.status(200).json({ status: "Success", data: course });
  } catch (error) {
    res.status(500).json({ status:"Error",message: error.message });
  }
};

const AddCourse = async (req, res) => {
  try {
    const course = new courseModel({
      title:req.body.title,
      description:req.body.description,
      time:req.body.time,
      user_id:req.user._id
    });
    await course.save();

    res.status(201).json({ status: "Success", data: course });
  } catch (error) {
    res.status(500).json({ status:"Error",message: error.message });
  }
};

const UpdateCourse = async (req, res) => {
  try {
    const courseUpdate = await courseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!courseUpdate) {
        res.status(404).json({ status:"Fail",message: "Course Not Found" });
    }
    res.status(200).json({ status: "Success", message: "Course Updated" });
  } catch (error) {
    res.status(500).json({ status:"Error",message: error.message });
  }
};
const DeleteCourse = async (req, res) => {
  try {
    const courseDelete = await courseModel.findByIdAndDelete(req.params.id,);
    if (!courseDelete) {
      res.status(404).json({ status:"Fail",message: "Course Not Found" });
    }
    await videoModel.deleteMany({course_id:req.params.id})
    await commentModel.deleteMany({course_id:req.params.id})

    res.status(200).json({ status: "Success", message: "Course Deleted" });
  } catch (error) {
    res.status(500).json({ status:"Error",message: error.message });
  }
};

module.exports = {
  GetAllCourses,
  GetCourse,
  AddCourse,
  UpdateCourse,
  DeleteCourse,
};
