const videoModel = require("../models/video.model");
const courseModel = require("../models/course.model");
const CheckAccessToVideoMiddle = async (req, res, next) => {
    try {
        const VideoId=req.params.id;

        const Video =await videoModel.findById(VideoId);
        
        if(!Video){
          return  res.status(404).json({status:"Fail",message:"Video Not Found"});
        }
        const courseId=Video.course_id;
        const Course=await courseModel.findById(courseId);
        if(!Course){
            return  res.status(404).json({status:"Fail",message:"Course Not Found"});
          }
        if(Course?.user_id?.toString()===req.user._id.toString()){
            next();
        }
        else{
            return  res.status(403).json({status:"Fail",message:"You can not edit this Video"});    
        }
        
        
    } catch (error) {
        return  res.status(401).json({status:"Error",message:"Invalid token"});    
    }
};

module.exports = CheckAccessToVideoMiddle;
