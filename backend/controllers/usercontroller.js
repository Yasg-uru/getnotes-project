const User=require('../models/usermodel.js')
const catchasyncerrors=require('../middleware/catchasyncerrors.js');
const sendToken=require('../utils/sendtoken.js')
const Errorhandler=require('../utils/errorhandler.js')
const sendmail=require('../utils/sendmail.js')
const crypto=require('crypto')
exports.createuser=catchasyncerrors(async (req,res,next)=>{
const {name,email,password}=req.body;
const user=await User.create({
    name,email,password
});
// const token=user.getjwtToken()
sendToken(res,user,200);
});



//now creating login method 
exports.loginuser=catchasyncerrors(async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new Errorhandler("please enter email and password",400))

    }
    const user=await User.findOne({email:email}).select("+password");
    if(!user){
        return next(new Errorhandler("please enter correct email or password",400))
    }
    const comparepassword=await user.comparepassword(password);
    if(!comparepassword){
        return next(new Errorhandler("please enter correct email or password"));

    }
    sendToken(res,user,200);
})

//logout user 
exports.logout=catchasyncerrors(async(req,res,next)=>{
    await res.cookie('token',null,{
        expires:new Date(0),
        httpOnly:true
    });
    res.status(200).json({
        success:true,
        message:"logged out successfully"
    })
});


//get user details if user is logged in
exports.getdetail=catchasyncerrors(async(req,res,next)=>{
    const user=await User.findOne(req.user._id);
    if(!user){
        return  next(new Errorhandler("user not found",404));

    }
    res.json({
       success:true,
       user
    });


});



// forgot password
exports.forgotpassword=catchasyncerrors(async (req,res,next)=>{
const user=await User.findOne({email:req.body.email});
if(!user){
    return next(new Errorhandler("user not found",404));

}
const token=user.getresetpasswordToken();
await user.save({validateBeforeSave:false});


const resetPassword = `${req.protocol}://${req.get('host')}/getnotes/password/reset/${token}`;
console.log(resetPassword)

const message = `Your password reset token is:\n\n${resetPassword}\n\nIf you have not requested this email, please ignore it.`;
try {
    await sendmail({
        email:user.email,
        subject:"getnotes password recovery",
        message:message,
    })
    res.status(200).json({
        success:true,
        message:"email sent"
    });
} catch (error) {
     user.resetPasswordToken=undefined;
     user.resetPasswordExpire=undefined;
     await user.save({validateBeforeSave:false})
return next(new Errorhandler(error.message,500));
}
}
);


//resetpassword 
 exports.resetpassword=catchasyncerrors(async (req,res,next)=>{
    // now we have resetpassword token and their time 
    const resetPasswordToken= crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user =await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    });
     if(!user){
        return next(new Errorhandler("user not found",404));

     }
     if(req.body.password!==req.body.confirmpassword){
        return next(new Errorhandler("password not match",404));
 }else{
    user.password=req.body.password;
    user.resetPasswordExpire=undefined;
    user.resetPasswordToken=undefined;
    await user.save();

 }
 sendToken(res,user,200);

 });

 //update password
 exports.updatepassword=catchasyncerrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select('+password');
    if(! user){
        return next(new Errorhandler("user not found",404));

    }
    const ispasswordmatched=await user.comparepassword(req.body.oldpassword);
    if(!ispasswordmatched){
        return next (new Errorhandler("oldpassword is incorrect",404));
    }
    if(req.body.newpassword!==req.body.confirmpassword){
        return next(new Errorhandler("please enter correct password"))
    }
    user.password=req.body.newpassword;
    await user.save();
    sendToken(res,user,200);

 })


 //creating admin pannel for updating particular user role and get allusers and getsingleuser,and deleting user with their id
 exports.getalluser=catchasyncerrors(async(req,res,next)=>{
    const user=await User.find({});
    if(!user){
        return next(new Errorhandler("user not found",404));
    }
    res.status(200).json({
        success:true,
        user:user
    });
 });

 //get single user with id
 exports.getsingleuser=catchasyncerrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new Errorhandler("user not found",404));
    }
    res.status(200).json({
        success:true,
        user,
    });
 });
 //update user profile
 exports.updateuserprofile=catchasyncerrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    const newuser={
        name:req.body.name,
        email:req.body.email,
        
    }
    if(!user){
        return next(new Errorhandler("user not found"));

    }
    const updateduser=await User.findByIdAndUpdate(req.params.id,newuser,{
        new :true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        updateduser

    })
 });
 





 
 //update particular user 
 exports.updateuserrole=catchasyncerrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    const newuser={
     
        role:req.body.role
    }
    if(!user){
        return next(new Errorhandler("user not found"));

    }
    const updateduser=await User.findByIdAndUpdate(req.params.id,newuser,{
        new :true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        updateduser

    })
 });

 exports.deleteuser=catchasyncerrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new Errorhandler("user not found",404));

    }
    await User.findByIdAndDelete(req.body.id);
    res.status(200).json({
        success:true,
        message:"deleted user successfully"
    })
 });





