import { useNavigate } from "react-router-dom"
import { useThemeContext } from "./ThemeContext"
import { AppBar, Box, ButtonBase, Grid, Toolbar } from "@mui/material"
import { AccountBox, ArrowBackIos } from "@mui/icons-material"
import { useEffect, useState } from "react"
import axios from "axios"
import { HomeOrgProfileCard } from "./HomeOrgProfileCard"
import { HomeProfileCard } from "./HomeProfileCard"

export const MobileProfileCard = () => {
    const { theme } = useThemeContext()
    const navigate = useNavigate()
    const [isCompany, setIsCompany] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [username, setUsername] = useState('')
    const [industry, setIndustry] = useState('')
    const [desc, setDesc] = useState('')
    const [dp, setDp] = useState('')
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])

    const fetchData = async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        if (!token) return

        try {
            const response = await axios.get('http://localhost:2000/user/me', {
                headers: { Authorization: `Bearer ${token}` }
            })

            const user = response.data.user
            const profile = response.data.profile
            setIsCompany(user.isCompany)
            setUsername(user.username)
            setFirstName(profile.firstName)
            setLastName(profile.lastName)
            setCompanyName(profile.companyName)
            setIndustry(profile.industry)
            setDesc(profile.description)
            setDp(profile.currentDp)
            setFollowers(profile.followers)
            setFollowing(profile.following)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {fetchData()},[])
    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: theme.primaryBg, color: theme.primaryText }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <AppBar position='static' sx={{ backgroundColor: theme.background, backdropFilter: 'blur(10px)', borderBottom: `1px solid ${theme.cardBorder}`, color: theme.primaryText }}>
                        <Toolbar>
                            <Grid container sx={{ alignItems: 'center' }}>
                                <Grid size={3}>
                                    <Box>
                                        <ButtonBase onClick={() => navigate('/')} sx={{
                                            display: 'flex',
                                            flexDirection: 'column', justifyContent: 'flex-end',
                                            alignItems: 'center', pb: 0.5, px: 1,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                color: theme.hoverAccent,
                                            }
                                        }}>
                                            <ArrowBackIos />
                                        </ButtonBase>
                                    </Box>
                                </Grid>
                                <Grid size={9}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <AccountBox sx={{
                                            height: { lg: '35px', md: '35px', sm: '32px' },
                                            width: { lg: '35px', md: '35px', sm: '32px' }
                                        }} />
                                        <Box component='span' sx={{ fontWeight: 'bolder', fontSize: { lg: '22px', md: '22px', sm: '20px' } }}>
                                            Profile
                                        </Box>
                                        <Box component='span' sx={{ fontWeight: 'bolder', fontSize: { lg: '22px', md: '22px', sm: '20px' } }}>
                                            Card
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid size={12}>
                    <Box>
                        {isCompany ? <HomeOrgProfileCard theme={theme} companyName={companyName} industry={industry}
                            handleView={() => navigate('/UserPosts')} desc={desc} dp={dp} username={username} followers={followers}
                            following={following} /> :
                            <HomeProfileCard theme={theme} firstName={firstName} lastName={lastName} following={following}
                                username={username} handleView={() => navigate('/UserPosts')} desc={desc} dp={dp} followers={followers} />}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
