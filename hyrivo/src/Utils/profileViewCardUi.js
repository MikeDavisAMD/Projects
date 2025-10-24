export const ProfileViewCardUi = ({firstName, lastName, username, dp, theme, following, followers, loading, isFollowing, handleClick}) => {
    return (
        <>
        <style>{`
            .card {
                max-width: auto;
                width: 100%;
                height: auto;
                border-radius: 1rem;
                background-color: ${theme.cardBg};
                padding: 1rem;
            }

            .infos {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                grid-gap: 1rem;
                gap: 1rem;
            }

            .image {
                height: 7rem;
                width: 7rem;
                border-radius: 0.5rem;
                background-color: ${theme.background};
                background: linear-gradient(40deg, ${theme.primaryAccent} 20%, ${theme.hoverAccent} 100%);
            }

            .dp {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 62px; 
                height: 100%;
            }

            .info {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .name {
                font-size: 1.25rem;
                line-height: 1.75rem;
                font-weight: 500;
                color: ${theme.primaryText};
            }

            .function {
                font-size: 0.75rem;
                line-height: 1rem;
                color: ${theme.secondaryText};
            }

            .stats {
                width: 100%;
                max-width: 300px;
                border-radius: 0.5rem;
                background-color: ${theme.background};
                padding: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: space-around;
                font-size: 0.75rem;
                line-height: 1rem;
                color: ${theme.primaryText};
                margin-top: 0.5rem;
            }

            .flex {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 0 4px;
            }

            .state-value {
                font-weight: 700;
                color: ${theme.primaryAccent};
            }

            .request {
                margin-top: 1.5rem;
                width: 100%;
                border: 1px solid transparent;
                background: ${theme.primaryAccent};
                color: ${theme.primaryText};
                border-radius: 0.5rem;
                padding: 0.5rem 1rem;
                font-size: 1rem;
                line-height: 1.5rem;
                transition: all .3s ease;
            }

            .request:hover {
                background-color: ${theme.hoverAccent};
                color: #fff;
            }
        `}</style>

        <div class="card">
            <div class="infos">
                <div class="image">
                {dp && dp.startsWith('https://') ? (
                    <img src={dp} alt="Display Pic" class="image"/>
                ):(
                    <div class='dp'>{dp}</div>
                )}
                </div>
                <div class="info">
                    <div>
                        <div class="name">
                            {`${firstName} ${lastName}`}
                        </div>
                        <div class="function">
                            @ {username}
                        </div>
                    </div>
                    <div class="stats">
                            <p class="flex flex-col">
                                Following
                                <span class="state-value">
                                    {following?.length || "0"}
                                </span>
                            </p>
                            <p class="flex">
                                Followers
                                <span class="state-value">
                                    {followers?.length || "0"}
                                </span>
                            </p>
                            
                    </div>
                </div>
            </div>
            <button class="request" type="button" onClick={handleClick}>
                {loading ? "Loading..." : isFollowing ? "Remove from connection" :"Add to connection"}
            </button>
        </div>

        </>
    )
}