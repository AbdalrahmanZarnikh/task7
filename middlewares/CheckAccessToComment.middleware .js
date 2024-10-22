const commentModel = require("../models/comment.model");
const CheckAccessToCommentMiddle = async (req, res, next) => {
    try {
        const CommentId=req.params.id;

        const Comment =await commentModel.findById(CommentId);

        if(!Comment){
          return  res.status(404).json({status:"Fail",message:"Comment Not Found"});
        }
        if(Comment?.user_id?.toString()===req.user._id.toString()){
            next();
        }
        else{
            return  res.status(403).json({status:"Fail",message:"You can not edit this Comment"});    
        }
        
        
    } catch (error) {
        return  res.status(401).json({status:"Error",message:"Invalid token"});    
    }
};

module.exports = CheckAccessToCommentMiddle;
