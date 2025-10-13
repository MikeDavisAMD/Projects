import React from 'react'
import { useParams } from 'react-router-dom'
import { ProfileCardOrg } from '../components/ProfileCardOrg'
import { ProfileCard } from '../components/ProfileCard'

export const ProfileCardWrapper = () => {
    const { profileType } = useParams()
    
    return profileType === "Organization" ? <ProfileCardOrg/> : <ProfileCard/>
}
