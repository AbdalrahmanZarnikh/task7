const connectdb = require("../DB/connectDb");
const express = require("express");

const router = express.Router();

const VideosControllers = require("../controllers/videos.controller");

const AuthMiddle = require("../middlewares/Auth.middleware");
const CheckAccessUser = require("../middlewares/CheckAccessUser.middleware");
const CheckAccessToCourseMiddle=require("../middlewares/CheckAccessToCourse.middleware")
const CheckAccessToVideoMiddle= require("../middlewares/CheckAccessToVideo.middleware")

router.route("/all").get(AuthMiddle, VideosControllers.GetAllVideos);

router
  .route("/add/:id")
  .post(AuthMiddle, CheckAccessUser,CheckAccessToCourseMiddle, VideosControllers.AddVideo);

router
  .route("/get-one/:id")
  .get(AuthMiddle, VideosControllers.GetVideo)

  router
  .route("/:id")
  .put(AuthMiddle, CheckAccessUser,CheckAccessToVideoMiddle, VideosControllers.UpdateVideo)
  .delete(AuthMiddle, CheckAccessUser,CheckAccessToVideoMiddle, VideosControllers.DeleteVideo);

module.exports = router;
