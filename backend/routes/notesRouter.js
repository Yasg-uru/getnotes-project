const express=require('express');
const router=express.Router();
const upload=require('../middleware/multer.js');
const { createsubjectanduploadpdf, updatenotes, getsinglenotesbyid, getallsubjects, deletesubjectsingle, deletepdfsinsidesubject } = require('../controllers/subjectcontroller');
const { createnotes } = require('../controllers/notescontroller.js');
const { isauthenicated, authorization } = require('../middleware/auth.js');
// const { test } = require('../controllers/tempco.js');


// router.route('/testing').post(upload.single('pdf'),test)
router.route('/createnotes').post(upload.single('pdf'),createsubjectanduploadpdf)
// router.route('/createnotes').post(isauthenicated,authorization("admin"),upload.single('pdf'),createsubjectanduploadpdf)
router.route('/updatenotes').post(isauthenicated,authorization('admin'),upload.single('pdf'),updatenotes);
router.route('/getsinglenote/:id').get(getsinglenotesbyid);
// router.route('/getsinglenote').get(isauthenicated,getsinglenotesbyname);
router.route('/getallsubjects').get(getallsubjects)
// router.route('/getallsubjects').get(isauthenicated,authorization('admin'),getallsubjects)
router.route('/deletesinglesubject/:id').delete(deletesubjectsingle)
// router.route('/deletesinglesubject').delete(isauthenicated,authorization("admin"),deletesubjectsingle)
router.route('/pdfdelete/:subjectname/:pdfid').delete(deletepdfsinsidesubject);
// router.route('/pdfdelete/:subjectname/:pdfid').delete(isauthenicated,authorization('admin'),deletepdfsinsidesubject);

// router.route('/createnotes/:subject/:topic').post(upload.array('pdfs'),createnotes)

module.exports=router;