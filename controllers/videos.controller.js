const courseModel = require("../models/course.model");
const videoModel = require("../models/video.model");
const commentModel = require("../models/comment.model");

const GetAllVideos = async (req, res) => {
  try {
    const videos = await videoModel.find().populate("course_id").populate("comments");
    res.status(200).json({ status: "Success", data: videos });
  } catch (error) {
    res.status(500).json({ status:"Error",message: error.message });
  }
};
const GetVideo = async (req, res) => {
  try {
    const video = await videoModel.findById(req.params.id).populate("course_id").populate("comments");
    if(!video){
      res.status(404).json({ status: "Fail", message: "Video Not Found" });
    }
    res.status(200).json({ status: "Success", data: video });
  } catch (error) {
    res.status(500).json({ status:"Error",message: error.message });
  }
};

const AddVideo = async (req, res) => {
  try {
    const courseId=req.params.id;
    const course=await courseModel.findById(courseId);
    if(!course){
      return res.status(404).json({status:"Fail",message:"Course Not Found"})
    }
    const video = new videoModel({
      title:req.body.title,
      description:req.body.description,
      course_id:courseId
    });
    course.videos.push(video);
    await course.save();
    await video.save();

    res.status(201).json({ status: "Success", data: video });
  } catch (error) {
    res.status(500).json({ status:"Error",message: error.message });
  }
};

const UpdateVideo = async (req, res) => {
  try {
    const videoUpdate = await videoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!videoUpdate) {
        res.status(404).json({ status: "Fail", message: "Video Not Found" });
    }
    res.status(200).json({ status: "Success", message: "Video Updated" });
  } catch (error) {
    res.status(500).json({ status:"Error",message: error.message });
  }
};
const DeleteVideo = async (req, res) => {
  try {
    const videoDelete = await videoModel.findByIdAndDelete(req.params.id);
    if (!videoDelete) {
        res.status(404).json({ status: "Fail", message: "Video Not Found" });
    }
    await commentModel.deleteMany({video_id:req.params.id});
    res.status(200).json({ status: "Success", message: "Video Deleted" });
  } catch (error) {
    res.status(500).json({ status:"Error",message: error.message });
  }
};

module.exports = {
  GetAllVideos,
  GetVideo,
  AddVideo,
  UpdateVideo,
  DeleteVideo,
};
