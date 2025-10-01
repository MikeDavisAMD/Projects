require('dotenv').config();
const express = require('express');
const router = express.Router()
const {userProfile, orgProfile} = require("../models/Profile")
const User = require("../models/User")
const auth = require("../middleware/auth")
const log = require("../middleware/log")
const cloudinary = require("../middleware/cloudinary");
const multer = require("multer");
const streamifier = require("streamifier")

const storage = multer.memoryStorage()
const upload = multer({storage})

const nodemailer = require('nodemailer');

// Nodemailer function
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

// mail on successfull registration
const registerSuccess = async (email,username) => {
    const mailOptions = {
        from: '"Hyrivo" mike732000davis@gmail.com',
        to: email,
        subject: `Welcome to Hyrivo, ${username}`,
        text: `Hi ${username}!! Your Account has been registered successfully`,
        html: `<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; background-color: #E4F7FF">
                <div style="max-width: 600px; margin: auto; padding: 16px">
                    <a style="text-decoration: none; outline: none" href="" target="_blank">
                    <img
                        style="height: 32px; vertical-align: middle"
                        height="32px"
                        src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1753771099/favicon_rqa3fx.png"
                        alt="logo"
                    />
                    </a>
                    <p>Welcome to the <img style="height: 32px; vertical-align: middle" height="32px" src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1753771997/Hyrivo_copy_zrnnzn.png" alt="logo" /> family! We're excited to have you on board.</p>
                    <p>
                    Your account has been successfully created, and you're now ready to explore all the great
                    features we offer.
                    </p>
                    <p>
                    <a
                        style="
                        display: inline-block;
                        text-decoration: none;
                        outline: none;
                        color: #fff;
                        background-color: #00BFFF;
                        padding: 8px 16px;
                        border-radius: 30px;
                        "
                        href=""
                        target="_blank"
                    >
                        Open Hyrivo
                    </a>
                    </p>
                    <p>
                    If you have any questions or need help getting started, our support team is just an email away
                    at
                    <a href="mailto:hyrivo73@gmail.com" style="text-decoration: none; outline: none; color: #00BFFF"
                        >hyrivo73@gmail.com</a
                    >. We're here to assist you every step of the way!
                    </p>
                    <p>Thank you from team,<br /><img style="height: 42px; vertical-align: middle" height="32px" src="https://res.cloudinary.com/ddxvuspzg/image/upload/v1753771997/Hyrivo_copy_zrnnzn.png" alt="logo" /></p>
                </div>
                </div>`,
    }
    await transporter.sendMail(mailOptions)
}

const linkProfileToUser = async (userId, profileId) => {
    const user = await User.findById(userId)
    if (user) {
        user.profileId = profileId
        user.isExistingUser = true
        await user.save()
    }
}

const cleanDates = (obj) => {
    if (Array.isArray(obj)) {
        obj.forEach(item => cleanDates(item));
    } else if (obj && typeof obj === "object") {
        for (const key in obj) {
            if (["startDate", "endDate", "issueDate", "expiryDate"].includes(key)) {
                if (obj[key] === "N/A" || obj[key] === "Present" || obj[key] === "") {
                    obj[key] = null; 
                }
            }
            cleanDates(obj[key]);
        }
    }
};

const streamUpload = (fileBuffer, username) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            folder: `Hyrivo/Resume/${username}`,
            format:"pdf",
            resource_type: "raw"
        }, (error, result) => {
            if (result) resolve(result) 
            else reject(error)
        })
        streamifier.createReadStream(fileBuffer).pipe(stream)
    })
}

router.post('/',log,auth, async (req, res) => {
    try {
        cleanDates(req.body)
        const user = await User.findById(req.userId)
        if (!user) return res.status(400).json({ message: "User not found" })

        let profile 
        let isNew

        if (!user.isCompany) {
            const { firstName, lastName, description, about, mobile, location,
            skills, experience, education, certificates, projects, resumes } = req.body
    
            profile = await userProfile.findOne({ userId: req.userId })

            if (!profile) {
                profile = new userProfile({
                    userId: req.userId,
                    firstName,lastName, mobile, location,
                    description, about, skills, experience, 
                    education, certificates, projects,
                    resumes: resumes?.filter(r => r.url && r.public_id) || []
                })
                isNew = true
            } else {
                profile.firstName = firstName
                profile.lastName = lastName
                profile.description = description
                profile.about = about
                profile.mobile = mobile
                profile.location = location
                profile.skills = skills
                profile.experience = experience
                profile.education = education
                profile.certificates = certificates
                profile.projects = projects
                if (resumes && resumes.length > 0) {
                    profile.resumes = resumes
                }
            }
        } else {
            const {companyName, description, about, industry, mobile, location, 
            founded,size,website,headquarters,specialities} = req.body

            profile = await orgProfile.findOne({userId: user._id})

            if (!profile) {
                profile = new orgProfile({
                    userId: req.userId,
                    companyName, description, mobile, location,
                    about, industry, founded, size, website, 
                    headquarters, specialities
                })
                isNew = true
            } else {
                profile.companyName = companyName;
                profile.description = description;
                profile.about = about;
                profile.mobile = mobile;
                profile.location = location;
                profile.industry = industry;
                profile.founded = founded;
                profile.size = size;
                profile.website = website;
                profile.headquarters = headquarters;
                profile.specialities = specialities;
            }
        }

        if (isNew) {
            await registerSuccess(user.email,user.username)
        }

        await profile.save()
        await linkProfileToUser(req.userId, profile._id)
        res.status(200).json({ profile, message: "Profile updated successfully" })
    } catch (error) {
        console.error("Profile Save Error:", error);
        res.status(500).json({ error: error.message })
    }
})

router.post('/upload/resume',log,auth,upload.single("file"),async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" })
        if (req.file.mimetype !== "application/pdf") return res.status(400).json({ error: "Uploaded file is not a pdf file" })

        const user = await User.findById(req.userId)
        if(!user) res.status(400).json({error: "User not found"})

        const result = await streamUpload(req.file.buffer, user.username)
        return res.status(200).json({
            url: result.secure_url,
            public_id: result.public_id,
            fileName: req.file.originalname
        })
    } catch (error) {
        console.error("Resume upload error", error)
        res.status(500).json({error: error.message})
    }
})

router.post('/resume',log,auth,async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.status(400).json({ message: "User not found" })

        const { url, public_id, fileName } = req.body

        if (!url || !public_id || !fileName) 
            return res.status(400).json({ message: "Resume details are incomplete" })

        const profile = await userProfile.findOne({ userId: req.userId })
        if (!profile) return res.status(400).json({ message: "Profile not found" })

        profile.resumes.push({
            url,
            public_id,
            fileName,
            uploadedAt: new Date()
        })

        await profile.save()

        res.status(200).json({ message: "New resume added successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete('/delete/resume/:public_id',log,auth,async (req,res) => {
    try {
        const { public_id } = req.params

        await cloudinary.uploader.destroy(public_id, { resource_type:'raw' })

        const profile = await userProfile.findOne({ userId: req.userId })
        if (!profile) return res.status(400).json({ message: "Profile details not found" })
        
        profile.resumes = profile.resumes.filter(r => r.public_id !== public_id)
        await profile.save()

        return res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        console.error("Delete error",error.message)
        res.status(500).json({error: error.message})
    }
})

router.get('/me',log,auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        let profile
        
        if (!user.isCompany) {
            profile = await userProfile.findOne({userId: req.userId})
        } else {
            profile = await orgProfile.findOne({userId: req.userId})
        }

        if (!profile) return res.status(400).json({profile: null})
        res.status(200).json({profile})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router