
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name of the subject"],
    },
    pdfs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pdf'
        }
    ]
});

module.exports = mongoose.model('Subject', subjectSchema);
