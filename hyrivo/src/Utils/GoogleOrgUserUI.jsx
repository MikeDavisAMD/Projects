import React, { useState } from 'react'
import icon from '../Assets/Images/Hyrivo copy.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const GoogleOrgUserUI = () => {
    const navigate = useNavigate()
    const [isCompany, setisCompany] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleContinue = async () => {
        setLoading(true)
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')

        try {
            await axios.put('http://localhost:2000/user/update/org',{isCompany},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            navigate(isCompany ? '/DetailsOrg' : '/Details')
        } catch (error) {
            console.error(error.message)
            alert("Unable to Change Account type")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <style>{`
        .card {
            max-width: 300px;
            border-radius: 1rem;
            background-color: #fff;
            box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05);
            border: 1px solid transparent;
        }

        .card a {
            text-decoration: none
        }

        .content {
            padding: 1.1rem;
        }

        .image {
            object-fit: cover;
            border-radius: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 150px;
            background-color: rgb(205, 213, 255);
        }

        .title {
            color: #111827;
            font-size: 1.125rem;
            line-height: 1.75rem;
            font-weight: 600;
        }

        .desc {
            margin-top: 0.5rem;
            color: #6B7280;
            font-size: 0.875rem;
            line-height: 1.25rem;
        }

        .action {
            display: inline-flex;
            margin-top: 1rem;
            color: #ffffff;
            font-size: 0.875rem;
            line-height: 1.25rem;
            font-weight: 500;
            align-items: center;
            gap: 0.25rem;
            background-color: #2563EB;
            padding: 4px 8px;
            border-radius: 4px;
        }

        .action span {
            transition: .3s ease;
        }

        .action:hover span {
            transform: translateX(4px);
        }

        .switch {
            --circle-dim: 0.9em;
            font-size: 14px;
            position: relative;
            display: inline-block;
            width: 2.5em;
            height: 1.5em;
        }

        /* Hide default HTML checkbox */
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        /* The slider */
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #f5aeae;
            transition: .4s;
            border-radius: 30px;
        }

        .slider-card {
            position: absolute;
            content: "";
            height: var(--circle-dim);
            width: var(--circle-dim);
            border-radius: 20px;
            left: 0.3em;
            bottom: 0.3em;
            transition: .4s;
            pointer-events: none;
        }

        .slider-card-face {
            position: absolute;
            inset: 0;
            backface-visibility: hidden;
            perspective: 1000px;
            border-radius: 50%;
            transition: .4s transform;
        }

        .slider-card-front {
            background-color: #DC3535;
        }

        .slider-card-back {
            background-color: #379237;
            transform: rotateY(180deg);
        }

        input:checked ~ .slider-card .slider-card-back {
            transform: rotateY(0);
        }

        input:checked ~ .slider-card .slider-card-front {
            transform: rotateY(-180deg);
        }

        input:checked ~ .slider-card {
            transform: translateX(1em);
        }

        input:checked ~ .slider {
            background-color: #9ed99c;
        }
        `}</style>

        <div className="card">
            <div className="image">
                <img src={icon} alt='Icon' style={{height:'80px'}}/>
            </div>
            <div className="content">
                <span className="title">
                    How would you like to log in?
                </span>

                <p className="desc">
                    Please choose whether you’re accessing the platform as an organization or as an employee. This will help us customize your experience.
                </p>
                
                <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <label className="switch">
                        <input type="checkbox" value={isCompany} onChange={e => setisCompany(e.target.checked)}/>
                        <div className="slider"></div>
                        <div className="slider-card">
                            <div className="slider-card-face slider-card-front"></div>
                            <div className="slider-card-face slider-card-back"></div>
                        </div>
                    </label>
                    <p className='title'>
                        Log in as organization
                    </p>    
                </div>

                <button className="action" onClick={handleContinue} disabled={loading}>
                    Continue
                <span aria-hidden="true">
                    →
                </span>
                </button>
            </div>
        </div>
        </>
    )
}
