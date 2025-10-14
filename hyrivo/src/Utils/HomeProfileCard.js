export const HomeProfileCard = ({theme, firstName, lastName, username, desc, handleView, dp}) => {
    return (
        <>
        <style>{`
            .profile-card {
                position: relative;
                width: 80%;
                background: ${theme.cardBg};
                -webkit-backdrop-filter: blur(48px);
                backdrop-filter: blur(48px);
                border-radius: 20px;
                padding: 2rem;
                box-shadow: 12px 12px 12px -20px ${theme.shadow};
                transform: perspective(1000px) scale(0.8); /*adjust the scale to view properly*/
                transform-style: preserve-3d;
            }

            .profile-image {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-color:${theme.background};
                margin: 0 auto 1rem;
                overflow: hidden;
                border: 3px solid ${theme.cardBg};
                box-shadow: 0px 0px 6px ${theme.shadow};
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .profile-pic {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .dp {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 62px; 
                height: 100%;
            }

            .profile-image::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 96px;
                background: linear-gradient(135deg, ${theme.primaryAccent}, ${theme.hoverAccent});
                border-radius: 20px 20px 0 0;
                z-index: -1;
            }

            .profile-info {
                text-align: left;
                margin-bottom: 1.5rem;
            }

            .profile-name {
                font-size: 1.5rem;
                font-weight: 600;
                color: ${theme.primaryText};
                margin-bottom: 0.25rem;
            }

            .profile-title {
                font-size: 0.9rem;
                color: ${theme.secondaryText};
                margin-bottom: 0.5rem;
            }

            .profile-bio {
                font-size: 0.85rem;
                color: ${theme.secondaryText};
                line-height: 1.4;
                margin-bottom: 1.5rem;
            }

            .social-links {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }

            .cta-button {
                width: 100%;
                padding: 0.8rem;
                border: none;
                border-radius: 10px;
                background: ${theme.primaryAccent};
                color: black;
                font-weight: 600;
                cursor: pointer;
                transition:
                    transform 0.2s,
                    background 0.2s;
            }

            .cta-button:hover {
                background: ${theme.hoverAccent};
                transform: translateY(-2px);
            }

            .stats {
                display: flex;
                justify-content: space-between;
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid ${theme.secondaryText};
            }

            .stat-item {
                text-align: center;
            }

            .stat-value {
                font-weight: 600;
                color: ${theme.primaryText};
            }

            .stat-label {
                font-size: 0.8rem;
                color: ${theme.secondaryText};
            }
        `}</style>

        <div class="profile-card">
            <div class="profile-image">
                {dp && dp.startsWith('https://') ? (
                    <img src={dp} alt="Display Pic" class="profile-pic"/>
                ):(
                    <div class='dp'>{dp}</div>
                )}
            </div>
            <div class="profile-info">
                <p class="profile-name">{`${firstName} ${lastName}`}</p>
                <div class="profile-title">@{username}</div>
                <div class="profile-bio">{desc}</div>
            </div>
        <button onClick={handleView} class="cta-button">View Profile</button>
        <div class="stats">
            <div class="stat-item">
            <div class="stat-value">15</div>
            <div class="stat-label">Followers</div>
            </div>
            <div class="stat-item">
            <div class="stat-value">82</div>
            <div class="stat-label">Following</div>
            </div>
            <div class="stat-item">
            <div class="stat-value">2</div>
            <div class="stat-label">Posts</div>
            </div>
        </div>
        </div>
        </>
    )
}