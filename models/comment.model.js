const  mongoose  = require("mongoose");


const commentSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    course_id:{
        type:mongoose.Schema.ObjectId,
        ref:"course",
        required:true
    },
    video_id:{
        type:mongoose.Schema.ObjectId,
        ref:"video",
        required:true
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    }
    

},  { timestamps: true }
)

const commentModel=mongoose.model("comment",commentSchema)

module.exports=commentModel;