// const mongoose=require('mongoose');

// const pdfSchema=new mongoose.Schema({
//     title:{
//         type:String,
//         required:[true,'please enter the pdf title']
//     },
//     path:{
//         type:String,
//         required:[true,'pdf path is required']
//     }
// });
// module.exports=mongoose.model("Pdf",pdfSchema);

// models/pdfmodel.js
const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter the pdf title']
    },
    path: {
        type: String,
        required: [true, 'Pdf path is required']
    }
});

module.exports = mongoose.model('Pdf', pdfSchema);
