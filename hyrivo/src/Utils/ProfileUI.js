export const ProfileUI = ({name, desc, username, theme}) => {
    return (
        <>
        <style>{`
            .card {
                width: 80%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                gap: 10px;
                background-color: theme.cardBg;
                border-radius: 15px;
                position: relative;
                overflow: hidden;
                padding: 20px;
            }

            .card::before {
                content: "";
                width: 100%;
                height: 100px;
                position: absolute;
                top: 0;
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
                border-bottom: 3px solid #fefefe;
                background: linear-gradient(40deg, rgba(131,58,180,1) 0%, #00bfff 50%, #bf00ff 100%);
                transition: all 0.5s ease;
            }

            .card * {
                z-index: 1;
            }

            .image {
                width: 90px;
                height: 90px;
                background-color:rgb(191, 74, 20);
                border-radius: 50%;
                border: 4px solid #fefefe;
                margin-top: 30px;
                transition: all 0.5s ease;
            }

            .card-info {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
                transition: all 0.5s ease;
            }

            .card-info span {
                font-weight: 600;
                font-size: 24px;
                color: theme.primaryText;
                margin-top: 15px;
                line-height: 5px;
            }

            .card-info p {
                color: theme.secondaryText;
                padding: 0px 20px;
            }

            .card:hover::before {
                width: 350px;
                height: 100%;
                border-bottom: none;
                border-bottom-left-radius: 15px;
                border-bottom-right-radius: 15px;
                transform: scale(0.95);
            }

            .card:hover .card-info {
                transform: translate(0%,-25%);
            }

            .card:hover .card-info span {
                transform: translateY(15px);
                transition: all 0.5s ease;
            }

            .card:hover .card-info p {
                transform: translateY(10px);
                transition: all 0.5s ease;
                max-width:300px
            }

            .card:hover .image {
                transform: scale(2) translate(-60%,-40%);
            }

            .button {
                text-decoration: none;
                background-color: #1468BF;
                color: white;
                padding: 5px 20px;
                border-radius: 5px;
                border: 1px solid white;
                transition: all 0.5s ease;
            }
            .button:hover {
                background-color: #FF6EC7;
                transform: scale(1.1);
            }
        `}</style>

        <div className="card">
            <div className="image"></div>
            <div className="card-info">
                <br/><br/>
                <span>{name}</span>
                <p>@ {username}</p>
                <p>{desc}</p>
            </div>
            <button className='button'>Edit</button>
        </div>
        </>
    )
}