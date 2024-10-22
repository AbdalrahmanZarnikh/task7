const courseModel = require("../models/course.model");
const CheckAccessToCourseMiddle = async (req, res, next) => {
    try {
        const CourseId=req.params.id;
        
        const Course =await courseModel.findById(CourseId);
        
        if(!Course){
          return  res.status(404).json({status:"Fail",message:"Course Not Found"});
        }
        if(Course?.user_id?.toString()===req.user._id.toString()){
            next();
        }
        else{
            return  res.status(403).json({status:"Fail",message:"You can not edit this Course"});    
        }
        
        
    } catch (error) {
        return  res.status(401).json({status:"Error",message:"Invalid token"});    
    }
};

module.exports = CheckAccessToCourseMiddle;
