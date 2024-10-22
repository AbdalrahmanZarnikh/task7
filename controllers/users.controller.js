const jwt=require("jsonwebtoken");
const userModel=require("../models/user.model");
const register=async(req,res)=>{
  try {
    const {email}=req.body;

    const checkExistUser=await userModel.findOne({email:email});
        
    if(checkExistUser){
        return res.status(400).json({status:"Fail",message:"wrong email or password"});
    }
    const user=new userModel(req.body);
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRES_IN
      });

    res.status(201).json({
        status:"Success",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    })

  } catch (error) {
     res.status(500).json({status:"Error",message:error.message})
  }


}


const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
         
        const user=await userModel.findOne({email:email});
        
        if(!user){
            return res.status(400).json({status:"Fail",message:"Invalid email or password"});
        }



        const isMatchPassword=await user.comparePassword(password);

        console.log(isMatchPassword)
        console.log(password)

        if(!isMatchPassword){
            return res.status(400).json({status:"Fail",message:"Invalid email or password"});
        }

    
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRES_IN
          });
    
         
        res.status(200).json({
            status:"Success",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
      } catch (error) {
         res.status(500).json({status:"Error",message:error.message})
        }
    }
    
    const GetUsers=async(req,res)=>{
        try {
            const users=await userModel.find({},{password:false,email:false});
            res.status(200).json({status:"Success",data:users})
        } catch (error) {
            res.status(500).json({message:error.message})
            
    }
}




module.exports={
    register,
    login,
    GetUsers,

}