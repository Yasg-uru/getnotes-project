const catchasyncerrors=require('../middleware/catchasyncerrors.js');
const errorhandler=require('../utils/errorhandler.js');
const {razorpay}=require('../server.js');
const Payment=require('../models/paymentmodel.js');
const User=require("../models/usermodel.js")


exports.buysubscription=catchasyncerrors(async(req,res,next)=>{
    const {id}=req.user;
    const user=await User.findById(id);
    if(!user){
        return next(new errorhandler("unauthorized user ,please login to continue",400));

    }

    if(user.role==='admin'){
        return next(new errorhandler("admin cannot buy subscription",404));

    }

    const subscription=await razorpay.subscriptions.create({
        plan_id:process.env.RAZORPAY_PLAN_ID,
        customer_notify:1,
        total_count:12
    })
    
})
