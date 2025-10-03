export const ProfileUI = ({name, desc, username, theme}) => {
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
                justify-content: center;
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
                background: white;
                border-radius: 15px;
                margin: auto;
                margin-bottom: 12px;
            }

            .card .share {
                margin: 1em;
                display: flex;
                justify-content: flex-end;
                gap: 1em;
            }

            .card a {
                color: ${theme.secondaryText};
                transition: .4s ease-in-out;
            }

            .card a:hover {
                color: ${theme.hoverAccent};
            }
        `}</style>

        <div class="card">
        <div class="share">
            <a href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
            </a>
        </div>
        <div class="img"></div>
        <span>{name}</span>
        <p class="username">@ {username}</p>
        <p class="info">{desc}</p>
        </div>
        </>
    )
}