const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: String,
    about: String,
    mobile: { type: String, required: true},
    location: { type: String, required: true},
    dp:[{
        name: { type:String, default: null },
        url: { type: String, default:null }
    }],
    currentDp: { type: String, default: null },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
}, { discriminatorKey: 'profileType', timestamps: true })

profileSchema.pre('save', function(next) {
    if (this.currentDp && this.currentDp.startsWith('https://')) return next()

    let initials = '+'

    if (this.profileType === 'Individual') {
        const firstName = this.firstName || ''
        const lastName = this.lastName || ''
        if (firstName && lastName) initials = (firstName[0] + lastName[0]).toUpperCase()
        else if (firstName) initials = firstName[0].toUpperCase()
    } else if (this.profileType === 'Organization') {
        const name = this.companyName || ''
        const parts = name.split(' ')
        if (parts.length === 1) initials = parts[0][0]?.toUpperCase() || '+'
        else initials = (parts[0][0] + parts[1][0])?.toUpperCase()
    }

    this.currentDp = initials
    next()
})

const Profile = mongoose.model('Profile',profileSchema)

const userProfile = Profile.discriminator('Individual', new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    skills: [{ type: String, required: true }],
    experience: [{
        title: String,
        empType: String,
        company: String,
        isCurrentRole: { type: Boolean, default: true },
        startDate: { type: Date, required: false, default: null },
        endDate: {type: Date, default: null},
        skills: [{ type: String }],
        location: String,
        locType: String,
    }],
    education: [{
        institute: String,
        degree: String,
        fieldOfStudy: String,
        isStudying: { type: Boolean, default: false },
        startDate: { type: Date, required: false, default: null },
        endDate: {type: Date, default: null},
        grade: { type: Number, min: 0, max: 10 },
    }],
    certificates: [{
        name: String,
        issuingOrg: String,
        issueDate: { type: Date, required: false, default: null },
        expiryDate: {type: Date, default: null},
        hasNoExpiry: { type: Boolean, default: false },
        credId: String,
        credUrl: String,
        skills: [{ type: String }]
    }],
    projects: [{
        name: String,
        description: String,
        skills: [{ type: String }],
        isInProgress: { type: Boolean, default: false },
        startDate: { type: Date, required: false, default: null },
        endDate: {type: Date, default: null},
        org: {
            type: String,
            enum: ["Educational Project", "Live Project", "Standalone Project"],
        },
        assn: [{type: String}],
        link: String
    }],
    resumes: [{
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        fileName: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now }
    }]
}))

const orgProfile = Profile.discriminator('Organization', new mongoose.Schema({
    companyName: {type: String, required: true},
    industry: {type: String, required: true},
    founded: Date,
    size: {type: String},
    website: String,
    headquarters: String,
    specialities: [String],
}))

module.exports = { Profile, userProfile, orgProfile }