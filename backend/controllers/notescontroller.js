const Subject=require('../models/pdfmodel.js')
const catchasyncerrors=require('../middleware/catchasyncerrors.js');
const uplaod=require('../middleware/multer.js')
exports.createnotes=catchasyncerrors(async(req,res,next)=>{
    try{
    let subjectname=req.params.subject;
    let topicname=req.params.topic;
    
    const subject=await Subject.findOne({name:subjectname});
    if(!subject){
       subject=await Subject.create({name:subjectname});

    }
    const topicindex=subject.topics.findindex(function(topic){
        return topic.title===topicname;
    })
    if(topicindex===-1){
        subject.topics.push({name:topicname});
        await subject.save();
    }

    const topic=subject.topics.find((topic)=>{
        topic.title===topicname;
    });
    // req.files.forEach(file => {
    //     subject.topics.pdfs.push({title:file.originalname,path:`/fileuploads/${file.originalname}`});

    // });
    // subject.save();
    // res.status(200).json({
    //     success:true,
    //     message:"file uploaded successfully"

    // })
    req.files.forEach(file => {
        console.log("file name:",file.originalname)
        subject.topics.pdfs.push({ title: file.originalname, path: `public/${file.originalname}` });
    });
    
    // Save the subject document
    await subject.save();
    
    res.status(200).json({
        success: true,
        message: "file uploaded successfully"
    });
    
}catch(error){
    console.log("error is occured")
    console.error(error);
    res.status(404).json({
        success:false,
        message:"internal server"
    })
}


    
}
);