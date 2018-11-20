const mongoose = require('mongoose');


const conversationSchema = new mongoose.Schema({
    name: String,
    says: [ String ],
    reply: [{ question: String, answer: String }],
    ownerId: String
});

module.exports = mongoose.model('conversations', conversationSchema);