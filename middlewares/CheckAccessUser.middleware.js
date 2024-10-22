
const CheckAccessUserMiddle = async (req, res, next) => {
    try {
        console.log(req.user.role)
        if(req.user.role=="MANAGER"){
            next();
        }
        else{
            return  res.status(403).json({status:"Fail",message:"You Can Not Access "});    
        }
        
        
    } catch (error) {
        return  res.status(401).json({status:"Error",message:"Invalid token"});    
    }
};

module.exports = CheckAccessUserMiddle;
