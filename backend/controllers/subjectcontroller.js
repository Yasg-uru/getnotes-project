const catchasyncerrors = require("../middleware/catchasyncerrors.js");
const Errorhandler = require("../utils/errorhandler.js");
const Subject = require("../models/subjectmodel.js");
const Pdf = require("../models/pdfmodel.js");
const uploadOnCloudinary = require("../utils/claudinary.js");

exports.createsubjectanduploadpdf = catchasyncerrors(async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const { name } = req.body;
    let subject = await Subject.findOne({ name });
    if (!subject) {
      subject = await Subject.create({ name });
    }
  
    const cloudinary = await uploadOnCloudinary(req.file.path);
    
    const pdf = await Pdf.create({
      title: req.file.originalname,

      path: cloudinary.secure_url,
    });

    subject.pdfs.push(pdf._id);
    await subject.save();

    res.status(200).json({
      success: true,
      data: subject,
    });
  } catch (error) {
 
    res.status(404).json({
      success: false,
      message: "internal server error",
    });
  }
});
exports.updatenotes = catchasyncerrors(async (req, res, next) => {
  try {
    let subject = await Subject.findOne({ name: req.body.name });
    if (!subject) {
      return next(
        new Errorhandler(
          "subject is not found please create subject then update notes",
          404
        )
      );
    }
    const pdf = await Pdf.create({
      title: req.file.originalname,
      path: `temporary/${req.file.originalname}`,
    });
    subject.pdfs.push(pdf._id);
    await subject.save();
    res.status(200).json({
      success: true,
      subject,
    });
  } catch (error) {
    return next(new Errorhandler(error.message, 500));
  }
});
exports.getsinglenotesbyid = catchasyncerrors(async (req, res, next) => {
  let subject = await Subject.findById(req.params.id );
  console.log("subject is :" + subject);
  if (!subject) {
    return next(new Errorhandler("subject not found ", 404));
  }
  subject = await Subject.findById(req.params.id).populate("pdfs");
  console.log("subject is :" + subject);
  if (!subject) {
    return next(new Errorhandler("subject not found ", 404));
  }
  res.status(200).json({
    success: true,
    subject,
  });
});

exports.getallsubjects = catchasyncerrors(async (req, res, next) => {
  const subject = await Subject.find({});
  if (!subject) {
    return next(new Errorhandler("subject not found", 404));
  }
  res.status(200).json({
    success: true,
    subject,
  });
});

exports.deletesubjectsingle = catchasyncerrors(async (req, res, next) => {
  let subject = await Subject.findById(req.params.id);
  // let subject = await Subject.find({ name: req.body.name });
  if (!subject) {
    return next(new Errorhandler("subject not found", 404));
  }
  for( const PdfId of subject.pdfs){
    await Pdf.findByIdAndDelete(PdfId);
  }

  subject = await Subject.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "deleted successfully",
  });
});

// exports.deletepdfsinsidesubject = catchasyncerrors(async (req, res, next) => {
//     try {
//         const subjectname = req.params.subjectname;
//   const pdfId = req.params.pdfid;
//   let subject = await Subject.find({ name: subjectname });
//   if (!subject) {
//     return next(new Errorhandler("subject not found"));
//   }
//   console.log("subjects"+subject);
//   if (!subject.pdfs.includes(pdfId)) {
//     return next(new Errorhandler("subject not found", 404));
//   }
  
//   if (!subject.pdfs || !subject.pdfs.includes(pdfId)) {
//     return next(new Errorhandler("PDF not found inside subject", 404));
//   }

//   subject.pdfs.pull(pdfId);

//   await subject.save();
//   const pdf = await Pdf.findById(pdfId);
//   if (!pdf) {
//     return next(new Errorhandler("pdf not found ", 404));
//   }
//   await Pdf.findByIdAndDelete(pdfId);
//   res.status(200).json({
//     success: true,
//   });
//     } catch (error) {
        
//         res.status(500).json({
//             success:false,
//             message:error
//         })
//     }
  
// });


exports.deletepdfsinsidesubject = catchasyncerrors(async (req, res, next) => {
  const subjectName = req.params.subjectname;
  const pdfId = req.params.pdfid;

  // Find the subject by name
  const subject = await Subject.findOne({ name: subjectName });

  if (!subject) {
    return next(new Errorhandler('Subject not found', 404));
  }

  // Check if the subject contains the specified PDF ID
  if (!subject.pdfs.includes(pdfId)) {
    return next(new Errorhandler('PDF not found in the subject', 404));
  }

  // Remove the PDF ID from the subject's pdfs array
  subject.pdfs.pull(pdfId);

  // Save the subject to update the pdfs array
  await subject.save();

  // Delete the PDF document
  const deletedPdf = await Pdf.findByIdAndDelete(pdfId);

  if (!deletedPdf) {
    return next(new ErrorHandler('PDF not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'PDF deleted successfully',
  });
});
