const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: [
            "frontend",
            "backend",
            "fullstack",
            "database",
            "dsa",
            "data-science",
            "miscellaneous"
        ],
        required: true
    },

    deadline: {
        type: Date,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Challenge', challengeSchema);
