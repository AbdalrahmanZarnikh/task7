const connectdb=require("../DB/connectDb")

const express = require("express")

const router=express.Router();

const CoursesControllers=require("../controllers/courses.controller");

const AuthMiddle=require("../middlewares/Auth.middleware");
const CheckAccessUser=require("../middlewares/CheckAccessUser.middleware");
const CheckAccessToCourse=require("../middlewares/CheckAccessToCourse.middleware");



router.route("/all")
      .get(AuthMiddle,CoursesControllers.GetAllCourses)
      
      router.route("/add")
      .post(AuthMiddle,CheckAccessUser,CoursesControllers.AddCourse)
     router.route("/get-one/:id")
      .get(AuthMiddle,CoursesControllers.GetCourse)

router.route("/:id")
      .put(AuthMiddle,CheckAccessUser,CheckAccessToCourse,CoursesControllers.UpdateCourse)
      .delete(AuthMiddle,CheckAccessUser,CheckAccessToCourse,CoursesControllers.DeleteCourse);

module.exports=router;