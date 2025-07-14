const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    FullName: String,
    EmailAddress: String,
    PhoneNumber: Number,
    InterestedCourse: String,
    Subject: String,
    Message: String,
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;