const  mongoose  = require("mongoose");

const bcrypt=require("bcryptjs");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"USER"
    }
},  { timestamps: true }
)



userSchema.pre("save",async function(next){
    this.password=await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.comparePassword=
async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const userModel=mongoose.model("user",userSchema)


module.exports=userModel;