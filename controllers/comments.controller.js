const courseModel = require("../models/course.model");
const videoModel = require("../models/video.model");
const commentModel = require("../models/comment.model");

const GetAllComments = async (req, res) => {
  try {
    const comments = await commentModel.find().populate( "video_id" ).populate("course_id");
    res.status(200).json({ status: "Success", data: comments });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};
const GetComment = async (req, res) => {
  try {
    const comment = await commentModel.findById(req.params.id);
    if (!comment) {
      res.status(404).json({ status: "Fail", message: "Comment Not Found" });
    }
    res.status(200).json({ status: "Success", data: comment });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

const AddComment = async (req, res) => {
  try {
    const videoId=req.params.id;
    const video=await videoModel.findById(videoId);
    const courseId=req.body.course_id;
    const course=await courseModel.findById(courseId)
    if(!video){
     return res.status(404).json({status:"Fail",message:"Video Not Found"})
    }
    if(!course){
      return res.status(404).json({status:"Fail",message:"Course Not Found"})
     }
    const comment = new commentModel({
       description:req.body.description,
       course_id:req.body.course_id,
       video_id:videoId,
       user_id:req.user._id
    });
    video.comments.push(comment);
    await video.save();
    await comment.save();

    res.status(201).json({ status: "Success", data: comment });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

const UpdateComment = async (req, res) => {
  try {
    const commentUpdate = await commentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!commentUpdate) {
      res.status(404).json({ status: "Fail", message: "Comment Not Found" });
    }
    res.status(200).json({ status: "Success", message: "Comment Updated" });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};
const DeleteComment = async (req, res) => {
  try {
    const commentDelete = await commentModel.findByIdAndDelete(req.params.id);
    if (!commentDelete) {
      res.status(404).json({ status: "Fail", message: "Comment Not Found" });
    }
    res.status(200).json({ status: "Success", message: "Comment Deleted" });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

module.exports = {
  GetAllComments,
  GetComment,
  AddComment,
  UpdateComment,
  DeleteComment,
};
