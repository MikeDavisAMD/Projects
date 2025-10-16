import { Done, Edit } from "@mui/icons-material"
import { ButtonBase, CircularProgress, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProfilUIOrg = ({dp, name, desc, username, industry, theme, setError, setOpen, userId, fetchUser}) => {
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)
    const [Name,setName] = useState("")
    const [user, setUser] = useState("")
    const [description, setDescription] = useState("")
    const [Industry, setIndustry] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setName(name || "")
        setUser(username || "")
        setDescription(desc || "")
        setIndustry(industry || "")
    },[name,username,desc,industry])

    const handleSave = async () => {    
        try {
            setLoading(true)

            await axios.put(`http://localhost:2000/profile/update/Org/profileCard/${userId}`,{
                companyName: Name,
                description,
                industry: Industry,
                username: user
            },{
                headers:{ Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}` }
            })

            setIsEditing(false)
            fetchUser()
        } catch (error) {
            setError("Failed to edit details",error.message)
            setOpen(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <style>{`
            .card {
                width: 82%;
                height: 100%;
                background: ${theme.cardBg};
                transition: 1s ease-in-out;
                clip-path: polygon(30px 0%, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0% 30px);
                border-top-right-radius: 20px;
                border-bottom-left-radius: 20px;
                display: flex;
                flex-direction: column;
            }

            .card span {
                font-weight: bolder;
                color: ${theme.primaryText};
                text-align: center;
                display: block;
                font-size: 40px
            }

            .card .username {
                display: flex;
                color: ${theme.secondaryText};
                flex-direction: column;
                align-items: center;
                gap: 12px;
            }

            .card .info {
                font-weight: 400;
                color: ${theme.secondaryText};
                display: block;
                text-align: center;
                font-size: 1em;
                margin: 1em;
            }

            .card .img {
                width: 4.8em;
                height: 4.8em;
                background: ${theme.primaryAccent};
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 15px;
                margin: auto;
                margin-bottom: 12px;
            }

            .card .name {
                width: 4.4em;
                height: 4.4em;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 15px;
                color: ${theme.primaryText};
                background: linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%);
                font-size: 1em;
                position: relative;
                overflow: hidden;
                transition: all 0.3s ease;
            }

            .card .name .dp {
                transform: scale(1.6);
                display: inline-block;
                transition: opacity 0.3s ease;
                z-index: 1; 
            }

            .card .edit-icon {
                position: absolute;
                inset: 0;                           
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(0, 0, 0, 0.5);   
                color: white;
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 2;
                font-size: 1.8em;
            }

            .card .name:hover .edit-icon {
                opacity: 1;                          
                transform: scale(1.2);             
            }

            .card .name:hover .dp {
                opacity: 0.3;                        
            }

            .card .share {
                margin: 1em;
                display: flex;
                justify-content: flex-end;
                gap: 1em;
            }
        `}</style>

        <div class="card">
        <div class="share">
            <ButtonBase onClick={() => isEditing ? handleSave() : setIsEditing(true)} sx={{display:'flex',color: theme.primaryText,
                flexDirection:'column',justifyContent:'flex-end',
                alignItems:'center', pb:0.5, px:1,
                transition: 'all 0.3s ease',
                '&:hover': {
                color: theme.hoverAccent,
                }
            }}>{isEditing ? loading ? <CircularProgress size={24} color="inherit"/> : <Done/> : <Edit/>}</ButtonBase>
        </div>
        <div class="img">
            <div class="name">
                <ButtonBase onClick={()=>navigate('/Profile/EditDP')} className="edit-icon" sx={{display:'flex',color: theme.secondaryText,
                    flexDirection:'column',justifyContent:'flex-end',
                    alignItems:'center', pb:0.5, px:1,
                    transition: '.4s ease-in-out',
                    '&:hover': {
                        color: theme.hoverAccent,
                    }
                }}><Edit/></ButtonBase>
                {dp && dp.startsWith('https://') ? (
                    <img src={dp} height='100%' width='100%' alt="Display Pic"/>
                ):(
                    <div class='dp'>{dp}</div>
                )}
            </div>
        </div>
        {isEditing ? (
            <span>
            <TextField variant='standard' value={Name}
                onChange={e=>setName(e.target.value)} autoFocus
                sx={{
                    '& .MuiInputBase-input': {
                        color: theme.primaryText,
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: theme.cardBorder,
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: theme.primaryAccent,
                    },
                    }}
                slotProps={{
                    input: {
                        style: {
                            width: `${Math.max(Name.length,4)}ch`
                        }
                    }
                }}/><br/>
                <TextField variant='standard' value={Industry}
                onChange={e=>setIndustry(e.target.value)} autoFocus
                sx={{
                    '& .MuiInputBase-input': {
                        color: theme.primaryText,
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: theme.cardBorder,
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: theme.primaryAccent,
                    },
                    }}
                slotProps={{
                    input: {
                        style: {
                            width: `${Math.max(Industry.length,4)}ch`
                        }
                    }
                }}/><br/>
                <TextField variant='standard' value={user}
                onChange={e=>setUser(e.target.value)} autoFocus
                sx={{
                    '& .MuiInputBase-input': {
                        color: theme.primaryText,
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: theme.cardBorder,
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: theme.primaryAccent,
                    },
                    }}
                slotProps={{
                    input: {
                        style: {
                            width: `${Math.max(user.length,4)}ch`
                        }
                    }
                }}/><br/>
                <TextField variant='standard' value={description}
                onChange={e=>setDescription(e.target.value)} autoFocus multiline fullWidth
                sx={{
                    '& .MuiInputBase-input': {
                        color: theme.primaryText,
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: theme.cardBorder,
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: theme.primaryAccent,
                    },
                    }}/>
            </span>
        ) : (
            <>
            <span>{name}</span>
            <p class="username">
                <div style={{fontWeight: "bold"}}>{industry}</div>
                <div>@ {username}</div>
            </p>
            <p class="info">{desc}</p>
            </>
        )}
        </div>
        </>
    )
}