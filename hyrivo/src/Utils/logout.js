import axios from 'axios'

export const logout = async (navigate, setUser) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) return

    try {
        await axios.post('http://localhost:2000/user/logout',{},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.error(error?.response?.data || error.message)
    }

    localStorage.removeItem('token') || sessionStorage.removeItem('token')
    localStorage.removeItem('theme') || sessionStorage.removeItem('theme')
    if (setUser) setUser([])
    
    navigate('/')
}