const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    description: String,
    about: String,
    skills: [{ type: String, required: true }],
    experience: [{
        title: { type: String, required: true },
        empType: { type: String, required: true },
        company: { type: String, required: true },
        isCurrentRole: { type: Boolean, default: true },
        startDate: { type: Date, required: true },
        endDate: Date,
        skills: [{ type: String, required: true }],
        location: { type: String, required: true },
        locType: { type: String, required: true },
    }],
    education: [{
        institute: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: String,
        isStudying: { type: Boolean, default: false },
        startDate: { type: Date, required: true },
        endDate: Date,
        grade: { type: Number, min: 0, max: 10 },
        activities: String
    }],
    certificates: [{
        name: { type: String, required: true },
        issuingOrg: { type: String, required: true },
        issueDate: { type: Date, required: true },
        expiryDate: Date,
        hasNoExpiry: { type: Boolean, default: false },
        credId: String,
        credUrl: String,
        skills: [{ type: String }]
    }],
    projects: [{
        name: { type: String, required: true },
        description: { type: String, required: true },
        skills: [{ type: String, required: true }],
        isInProgress: { type: Boolean, default: false },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        org: {
            type: String,
            enum: ["Educational Project", "Live Project", "Standalone Project"],
            required: true
        },
        assn: [{type: String, required: true}]
    }]
})

module.exports = mongoose.model('Profile',profileSchema)