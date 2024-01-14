const mongoose=require('mongoose')
const connectDatabase=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/getnotes",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
        
       
    }).then((data)=>{
        console.log(`mongo database is connected with server:${data.connection.host}`)
    }).catch((error)=>{
        console.log("we are unable to connect mongo database ")
    })
}
module.exports=connectDatabase;