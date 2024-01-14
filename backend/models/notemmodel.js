const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter the PDF title']
    },
    path: {
        type: String,
        required: [true, 'PDF path is required']
    }
});

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the topic name']
    },
    pdfs: [pdfSchema]
});

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name of the subject']
    },
    topics: [topicSchema]
});

module.exports = mongoose.model('Subject', subjectSchema);
