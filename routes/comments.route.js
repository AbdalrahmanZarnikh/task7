const connectdb=require("../DB/connectDb")
const express = require("express")

const router=express.Router();

const CommentsControllers=require("../controllers/comments.controller");

const AuthMiddle=require("../middlewares/Auth.middleware");
const CheckAccessToComment=require("../middlewares/CheckAccessToComment.middleware ");

router.route("/all")
      .get(AuthMiddle,CommentsControllers.GetAllComments)

      
      router.route("/add/:id")
      .post(AuthMiddle,CommentsControllers.AddComment)

      router.route("/get-one/:id")
      .get(AuthMiddle,CommentsControllers.GetComment)
      router.route("/:id")
      .put(AuthMiddle,CheckAccessToComment,CommentsControllers.UpdateComment)
      .delete(AuthMiddle,CheckAccessToComment,CommentsControllers.DeleteComment);

module.exports=router;