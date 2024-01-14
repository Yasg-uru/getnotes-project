const jwt=require('jsonwebtoken');
const catchasyncerrors=require('./catchasyncerrors.js')
const Errorhandler=require('../utils/errorhandler.js')
const User=require('../models/usermodel.js')


exports.isauthenicated=catchasyncerrors(async(req,res,next)=>{
    const token=req.cookies.token;
    
    console.log("this is token"+token)
    if(!token){
        return next(new Errorhandler("please loginn to continue ",404));

    }else{
        try {
            let decodeddata;
            decodeddata=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decodeddata)
            req.user=await User.findById(decodeddata.id)
            next();

        } catch (error) {
            return next(new Errorhandler("token is expired please login to continue"))
        }
      
    }
 

    
});
exports.authorization=function(...roles){
    return (req,res,next)=>{
        if(! roles.includes(req.user.role)){
            return next(new Errorhandler(`Role :${req.user.role} is not allowed to access this resource `,401));

        }
        next();
    }
}

