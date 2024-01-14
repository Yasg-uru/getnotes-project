const app=require('./app.js')
const dotenv=require('dotenv')
const connectDatabase=require('./config/database.js')
const Razorpay=require('razorpay');

 dotenv.config({path:"backend/config/config.env"})
  exports.razorpay = new Razorpay({
   key_id: process.env.RAZORPAY_KEY_ID,
   key_secret: process.env.RAZORPAY_SECRET,
 });
connectDatabase();

 app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
 });
 