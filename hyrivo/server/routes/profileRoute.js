require('dotenv').config();
const express = require('express');
const router = express.Router()
const Profile = require("../models/Profile")
const User = require("../models/User")
const auth = require("../middleware/auth")
const log = require("../middleware/log")

const linkProfileToUser = async (userId, profileId) => {
    const user = await User.findById(userId)
    if (user) {
        user.profile = profileId
        user.isExistingUser = true
        await user.save()
    }
}

router.post('/',log,auth, async (req, res) => {
    try {
        const { firstName, lastName, description, about,
            skills, experience, education, certificates, projects } = req.body

            let profile = await Profile.findOne({ userId: req.user.id })

            if (!profile) {
                profile = new Profile({
                    userId: req.user.id,
                    firstName,lastName,
                    description, about, skills, experience, 
                    education, certificates, projects
                })
                await profile.save()
            } else {
                profile.firstName = firstName
                profile.lastName = lastName
                profile.description = description
                profile.about = about
                profile.skills = skills
                profile.experience = experience
                profile.education = education
                profile.certificates = certificates
                profile.projects = projects

                await profile.save()
            }

            await linkProfileToUser(req.user.id, profile._id)
            res.status(200).json({ profile, message: "Profile updated successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/me',log,auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.user.id })

        if (!profile) return res.status(400).json({ profile: null })
        res.status(200).json({ profile })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router