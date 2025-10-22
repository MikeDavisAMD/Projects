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

const streamUploadProfile = (fileBuffer,username) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            folder:`Hyrivo/Profile/${username}`,
            format:'png',
            transformation: [{width:500, height:500, crop:'limit'}]
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

router.post('/upload/dp',log,auth,upload.single("file"),async (req,res) => {
    try {
        if (!req.file) return res.status(400).json({error:"No file uploaded"})

        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({error:'user not found'})

        let profile = !user.isCompany 
            ? await userProfile.findOne({userId: req.userId})
            : await orgProfile.findOne({userId: req.userId})

        if (!profile) return res.status(404).json({error:'Profile not found'})

        const result = await streamUploadProfile(req.file.buffer, user.username)

        profile.dp.push({ name: req.file.originalname, url: result.secure_url })
        profile.currentDp = result.secure_url

        await profile.save()

        return res.status(200).json({message: "Display Picture uploaded successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.put('/update/dp',log,auth, async (req, res) => {
    try {
        const { url } = req.body
        if (!url) return res.status(400).json({ error: "No image source found"})

        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({error:'user not found'})

        let profile = !user.isCompany 
            ? await userProfile.findOne({userId: req.userId})
            : await orgProfile.findOne({userId: req.userId})

        if (!profile) return res.status(404).json({error:'Profile not found'})

        profile.currentDp = url
        await profile.save()

        res.status(200).json({message: "Current display picture updated"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.delete('/delete/dp',log,auth,async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({error:'user not found'})

        let profile = !user.isCompany 
            ? await userProfile.findOne({userId: req.userId})
            : await orgProfile.findOne({userId: req.userId})

        if (!profile) return res.status(404).json({error:'Profile not found'})

        const currentDpUrl = profile.currentDp
        if (!currentDpUrl) return res.status(404).json({error:"No image source found"})

        if (currentDpUrl.startsWith("https://res.cloudinary.com")) {
            const match = currentDpUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/)
            const publicId = match ? match[1] : null

            if (publicId) {
                try {
                    await cloudinary.uploader.destroy(publicId)
                } catch (error) {
                    console.error("Cloudinary delete error:", error.message)
                }
            } else {
                console.warn("⚠️ Could not extract Cloudinary public_id from URL:", currentDpUrl)
            }

            profile.dp = profile.dp.filter(dp => dp.url !== currentDpUrl)

            if (profile.dp.length > 0) {
                profile.currentDp = profile.dp[profile.dp.length - 1].url
            } else {
                profile.currentDp = null
            }

            await profile.save()
            return res.status(200).json({message: "Display picture deleted successfully"})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.put('/update/profileCard/:userId', log, auth, async (req,res) => {
    try {
        const {userId} = req.params
        const {firstName, lastName, description, username} = req.body

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {username},
            {new: true}
        )

        if (!updatedUser) return res.status(400).json({ message: "User not found" })

        const updatedProfile = await userProfile.findOneAndUpdate(
            { userId },
            {firstName, lastName, description},
            {new: true}
        )

        if (!updatedProfile) return res.status(400).json({message:"Profile not found"})

        return res.status(200).json({
            message:"Profile updated successfully",
            user: updatedUser,
            profile: updatedProfile
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/update/Org/profileCard/:userId', log, auth, async (req,res) => {
    try {
        const {userId} = req.params
        const {companyName, description, username, industry} = req.body

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {username},
            {new: true}
        )

        if (!updatedUser) return res.status(400).json({ message: "User not found" })

        const updatedProfile = await orgProfile.findOneAndUpdate(
            { userId },
            {companyName, description, industry},
            {new: true}
        )

        if (!updatedProfile) return res.status(400).json({message:"Profile not found"})

        return res.status(200).json({
            message:"Profile updated successfully",
            user: updatedUser,
            profile: updatedProfile
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/update/details/:userId',log,auth, async (req,res) => {
    try {
        const {userId} = req.params
        const {mobile, location} = req.body

        const updatedDetails = await userProfile.findOneAndUpdate(
            {userId},
            {mobile, location},
            {new: true}
        )

        if (!updatedDetails) return res.status(400).json({message:"Profile not found"})

        return res.status(200).json({
            message:"Profile updated successfully",
            profile: updatedDetails
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/update/Org/details/:userId',log,auth, async (req,res) => {
    try {
        const {userId} = req.params
        const {mobile, location, founded, size, headquarters, website} = req.body

        const updatedDetails = await orgProfile.findOneAndUpdate(
            {userId},
            {mobile, location, founded, size, headquarters, website},
            {new: true}
        )

        if (!updatedDetails) return res.status(400).json({message:"Profile not found"})

        return res.status(200).json({
            message:"Profile updated successfully",
            profile: updatedDetails
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/update/about/:userId',log,auth,async (req, res) => {
    try {
        const {userId} = req.params
        const {about} = req.body

        const user = await User.findById(userId)
        if (!user) return res.status(404).json({error: "user not found"})
        
        const updatedAbout = !user.isCompany
            ? await userProfile.findOneAndUpdate(
                {userId},
                {about},
                {new: true}
            )
            : await orgProfile.findOneAndUpdate(
                {userId},
                {about},
                {new: true}
            )
        
        if (!updatedAbout) return res.status(400).json({message:"Profile not found"})

        return res.status(200).json({
            message:"Profile updated successfully",
            profile: updatedAbout
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/update/skills/:userId',log,auth,async (req, res) => {
    try {
        const {userId} = req.params
        const {skills} = req.body

        const updatedSkills = await userProfile.findOneAndUpdate(
            {userId},
            {skills},
            {new: true}
        )

        if (!updatedSkills) return res.status(400).json({message:"Profile not found"})

        return res.status(200).json({
            message:"Profile updated successfully",
            profile: updatedSkills
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/update/specialities/:userId',log,auth,async (req, res) => {
    try {
        const {userId} = req.params
        const {specialities} = req.body

        const updatedSpecialities = await orgProfile.findOneAndUpdate(
            {userId},
            {specialities},
            {new: true}
        )

        if (!updatedSpecialities) return res.status(400).json({message:"Profile not found"})

        return res.status(200).json({
            message:"Profile updated successfully",
            profile: updatedSpecialities
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/add/new/experience/:userId',log,auth,async (req, res) => {
    try {
        const {userId} = req.params
        const {experience} = req.body

        const newExp = await userProfile.findOneAndUpdate(
            {userId},
            {experience},
            {new: true}
        )

        if (!newExp) return res.status(400).json({message:"Profile not found"})

        return res.status(200).json({
            message:"Profile updated successfully",
            profile: newExp
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/update/experience/:expId',log,auth,async (req,res) => {
    try {
        const { expId } = req.params
        const updates = req.body

        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ error: "User not found" })

        const profile = await userProfile.findOne({userId: req.userId})
        if (!profile) return res.status(404).json({ error: "Profile not found" })

        const exp = profile.experience.id(expId)
        if (!exp) return res.status(404).json({ error: "Experience not found" })
        
        Object.assign(exp, updates)
        await profile.save({ validateModifiedOnly: true })

        const updatedExperience = profile.experience.id(expId)

        return res.status(200).json({ message: "Selected Experience updated successfully", updatedExperience })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete('/delete/experience/:expId',log,auth, async (req, res) => {
    try {
        const { expId } = req.params

        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ error: "User not found" })

        const profile = await userProfile.findOne({userId: req.userId})
        if (!profile) return res.status(404).json({ error: "Profile not found" })

        profile.experience = profile.experience.filter(e => e._id.toString() !== expId)

        await profile.save({ validateModifiedOnly: true })

        return res.status(200).json({ message: "Selected Experience Deleted Successfully" })
    } catch (error) {
        console.error("unable to delete",error.message)
        res.status(500).json({ error: error.message })
    }
})

router.put('/add/new/education/:userId',log,auth, async (req, res) => {
    try {
        const {userId} = req.params
        const {education} = req.body

        const newEdu = await userProfile.findOneAndUpdate(
            {userId},
            {education},
            {new: true}
        )

        if (!newEdu) return res.status(400).json({message:"Profile not found"})

        return res.status(200).json({
            message:"Profile updated successfully",
            profile: newEdu
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/update/education/:eduId',log,auth, async (req, res) => {
    try {
        const {eduId} = req.params
        const updates = req.body

        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ error: "User not found" })

        const profile = await userProfile.findOne({userId: req.userId})
        if (!profile) return res.status(404).json({ error: "Profile not found" })

        const education = profile.education.id(eduId)
        if (!education) return res.status(404).json({ error: "Education details unavailable" })

        Object.assign(education, updates)
        await profile.save({ validateModifiedOnly: true })

        const updatedEducation = profile.education.id(eduId)

        return res.status(200).json({ message: "Selected education details updated successfully", updatedEducation })
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

router.delete('/delete/education/:eduId',log, auth, async (req, res) => {
    try {
        const {eduId} = req.params

        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ error: "User not found" })

        const profile = await userProfile.findOne({userId: req.userId})
        if (!profile) return res.status(404).json({ error: "Profile not found" })

        profile.education = profile.education.filter(e => e._id.toString() !== eduId)

        await profile.save({ validateModifiedOnly: true })

        return res.status(200).json({ message: "Selected Education deleted successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/add/new/projects/:userId',log,auth, async (req, res) => {
    try {
        const {userId} = req.params
        const {projects} = req.body

        const newProject = await userProfile.findOneAndUpdate(
            {userId},
            {projects},
            {new: true}
        )

        if (!newProject) return res.status(404).json({message: "Profile not found"})
        
        return res.status(200).json({
            message: "Profile updated successfully",
            profile: newProject
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/update/projects/:projectId',log,auth, async (req, res) => {
    try {
        const {projectId} = req.params
        const updates = req.body 

        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ error: "User not found" })

        const profile = await userProfile.findOne({userId: req.userId})
        if (!profile) return res.status(404).json({ error: "Profile not found" })

        const project = profile.projects.id(projectId)
        if (!project) return res.status(404).json({ error: "Project details unavailable" })

        Object.assign(project, updates)
        await profile.save({ validateModifiedOnly: true })

        const updatedProjects = profile.projects.id(projectId)

        return res.status(200).json({ message: "Selected projects details updated successfully", updatedProjects })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete('/delete/projects/:projectId',log,auth, async (req,res) => {
    try {
        const {projectId} = req.params

        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ error: "User not found" })

        const profile = await userProfile.findOne({userId: req.userId})
        if (!profile) return res.status(404).json({ error: "Profile not found" })

        profile.projects = profile.projects.filter(p => p._id.toString() !== projectId)

        await profile.save({ validateModifiedOnly: true })

        return res.status(200).json({ message: "Selected project deleted successfully" })
    } catch (error) {
        res.status(500).json({})
    }
})

router.put('/add/new/certificates/:userId',log,auth, async (req, res) => {
    try {
        const {userId} = req.params
        const {certificates} = req.body

        const newCert = await userProfile.findOneAndUpdate(
            {userId},
            {certificates},
            {new :true}
        )

        if (!newCert) return res.status(404).json({message: "Profile not found"})

        return res.status(200).json({
            message: "Profile updated successfully",
            profile: newCert
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put('/update/certificates/:certId',log,auth, async (req, res) => {
    try {
        const {certId} = req.params
        const updates = req.body 

        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ error: "User not found" })

        const profile = await userProfile.findOne({userId: req.userId})
        if (!profile) return res.status(404).json({ error: "Profile not found" })

        const certificates = profile.certificates.id(certId)
        if (!certificates) return res.status(404).json({ error: "Certificate details unavailable"})

        Object.assign(certificates, updates)
        await profile.save({ validateModifiedOnly: true })

        const updatedCert = profile.certificates.id(certId)
        return res.status(200).json({ message: "Selected Certificate details updated successfully", updatedCert })
    } catch (error) {
        console.error("error:",error)
        res.status(500).json({ error: error.message })
    }
})

router.delete('/delete/certificates/:certId',log,auth, async (req, res) => {
    try {
        const {certId} = req.params

        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ error: "User not found" })

        const profile = await userProfile.findOne({userId: req.userId})
        if (!profile) return res.status(404).json({ error: "Profile not found" })

        profile.certificates = profile.certificates.filter(c => c._id.toString() !== certId)

        await profile.save({ validateModifiedOnly: true })

        return res.status(200).json({ message: "Selected Certificate deleted successfully" })
    } catch (error) {
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

        return res.status(200).json({ message: "Resume deleted successfully" })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post('/connect/add/:targetUserId',log,auth, async (req,res) => {
    try {
        const {targetUserId} = req.params
        const currentUserId = req.userId

        if (currentUserId === targetUserId) return res.status(400).json({ message: "Cannot connect to yourself"})

        const currentUser = await User.findById(currentUserId)
        const targetUser = await User.findById(targetUserId)
        if (!targetUser || !currentUser) return res.status(400).json({ message: "cannot find user"})

        const currentUserProfile = await currentUser.isCompany 
            ? await orgProfile.findOne({userId: currentUserId})
            : await userProfile.findOne({userId: currentUserId})

        const targetUserProfile = await targetUser.isCompany
            ? await orgProfile.findOne({userId: targetUserId})
            : await userProfile.findOne({userId: targetUserId})

        if (!currentUserProfile.following) currentUserProfile.following = []
        if (!targetUserProfile.followers) targetUserProfile.followers = []

        if (currentUserProfile.following.includes(targetUserId)) return res.status(400).json({ message: "Already Connected" })

        currentUserProfile.following.push(targetUserId)
        targetUserProfile.followers.push(currentUserId)

        await currentUserProfile.save()
        await targetUserProfile.save()

        return res.status(200).json({ message: "connection added successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
        console.error("error",error.message)
    }
})

router.delete('/connect/remove/:targetUserId',log,auth, async (req, res) => {
    try {
        const {targetUserId} = req.params
        const currentUserId = req.userId

        if (currentUserId === targetUserId) return res.status(400).json({ message: "Cannot connect to yourself"})

        const currentUser = await User.findById(currentUserId)
        const targetUser = await User.findById(targetUserId)
        if (!targetUser || !currentUser) return res.status(400).json({ message: "cannot find user"})

        const currentUserProfile = await currentUser.isCompany 
            ? await orgProfile.findOne({userId: currentUserId})
            : await userProfile.findOne({userId: currentUserId})

        const targetUserProfile = await targetUser.isCompany
            ? await orgProfile.findOne({userId: targetUserId})
            : await userProfile.findOne({userId: targetUserId})

        currentUserProfile.following = currentUserProfile.following.filter( id => id.toString() !== targetUserId)
        targetUserProfile.followers = targetUserProfile.followers.filter( id => id.toString() !== currentUserId)

        await currentUserProfile.save()
        await targetUserProfile.save()

        return res.status(200).json({ message: "unfollowed successfully"})
    } catch (error) {
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

router.get('/v/:profileType/:username',log, async (req, res) => {
    try {
        const {profileType, username} = req.params

        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ error: "User not found" })

        const profile = user.isCompany ? await orgProfile.findOne({ userId: user._id, profileType }) 
            : await userProfile.findOne({ userId: user._id, profileType })
        if (!profile) return res.status(404).json({ error: "Profile not found" })
        
        return res.status(200).json({user, profile})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router