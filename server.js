const express = require("express")
require("dotenv").config()

const CourseRouters=require("./routes/courses.route");
const VideosRouters=require("./routes/videos.route");
const CommentsRouters=require("./routes/comments.route")
const UsersRouters=require("./routes/users.route")

const app = express();










app.use(express.json());

app.use("/api/courses",CourseRouters)
app.use("/api/courses/videos",VideosRouters)
app.use("/api/courses/videos/comments",CommentsRouters)
app.use("/api/users",UsersRouters)







app.listen(process.env.PORT,()=>{
    console.log("Iam Listining.....")
});
