import bloomHtml from '../Assets/Images/bloomhtml.png'
import bloomReact from '../Assets/Images/bloommd73.png'
import falconcams from '../Assets/Images/falconcams.png'
import hyrivoapp from '../Assets/Images/hyrivoapp.png'
import todo from '../Assets/Images/todomd73.png'

export const ProjectsUi = () => {
    return (
        <>
            <style>{`
            .cards {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
            }
            
            .cards a {
                text-decoration: none;
                color: inherit;
                display: block;
            }

            .cards .red {
                background-color: #F9AB00;
            }

            .cards .blue {
                background-color: #0062ff;
            }

            .cards .green {
                background-color: #34A853;
            }

            .cards .cyan {
                background-color: #00CCCC;
            }

            .cards .violet {
                background-color: #E44DFC;
            }

            .cards .card {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                text-align: center;
                min-height: 300px;
                width: 200px;
                border-radius: 10px;
                color: white;
                cursor: pointer;
                transition: transform 0.4s;
                overflow: hidden;
                padding: 10px;
            }

            .cards .card p.tip {
                font-size: 1.5em;
                font-weight: 700;
                padding: 2px 5px;
            }

            .cards .card .content {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                margin: 5px 0;
                transition: all 0.3s ease;
            }

            .cards .card .content p.second-text {
                font-size: .7em;
                padding: 2px 5px;
                display: block;
            }

            .cards .card .content img.preview {
                width: 100%;
                height: auto;
                border-radius: 10px;
                display: none;
            }

            .cards .card div.third-text {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                padding: 2px 5px;
                column-gap: 8px;  
                row-gap: 2px;
            }

            .cards .card p.chip {
                background-color: rgba(255,255,255,0.2);
                border-radius: 16px;
                padding: 4px 10px;
                font-size: 0.55em;
                font-weight: 500;
                margin-top: 0;
                display: inline-block;
            }

            .cards .card:hover {
                transform: scale(1.2, 1.2);
            }

            .cards:hover > .card:not(:hover) {
                filter: blur(10px);
                transform: scale(0.9, 0.9);
            }
                
            .cards:hover > a:not(:hover) .card {
                filter: blur(10px);
                transform: scale(0.9, 0.9);
            }

            .cards .card:hover .content p.second-text {
                display: none;
            }

            .cards .card:hover .content img.preview {
                display: block;
            }
        `}</style>

            <div className="cards">
                <a href='https://bloomhtml.web.app/' target='_blank' rel='noopener noreferrer'>
                    <div className="card red">
                        <p className="tip">Bloom <br /><span style={{ fontSize: "15px" }}>with HTML</span></p>
                        <div className='content'>
                            <p className="second-text">
                                A practice project: a static website designed with pure HTML and CSS, built to test and refine my styling skills before moving to responsive design and functionality.
                            </p>
                            <img className="preview" src={bloomHtml} alt="Bloom HTML Preview" />
                        </div>
                        <div className="third-text">
                            <p className="chip">HTML</p>
                            <p className="chip">CSS</p>
                        </div>
                    </div>
                </a>
                <a href='https://bloommd73.web.app/' target='_blank' rel='noopener noreferrer'>
                    <div className="card violet">
                        <p className="tip">Bloom <br /><span style={{ fontSize: "15px" }}>with React and MUI</span></p>
                        <div className='content'>
                            <p className="second-text">
                                A practice project: a responsive homepage built with React and Material UI, designed to test and refine my React development skills.
                            </p>
                            <img className="preview" src={bloomReact} alt="Bloom React Preview" />
                        </div>
                        <div className="third-text">
                            <p className="chip">React JS</p>
                            <p className="chip">Material UI</p>
                        </div>
                    </div>
                </a>
                <a href='https://todomd73.web.app/' target='_blank' rel='noopener noreferrer'>
                    <div className="card blue">
                        <p className="tip">To Do List <br /><span style={{ fontSize: "15px" }}>with ShadCN and Firestore</span></p>
                        <div className='content'>
                            <p className="second-text">
                                A practice project: A responsive To-Do List app built using React, TypeScript, ShadCN UI, and Tailwind CSS, with task data stored in Firebase Firestore for real-time synchronization.
                            </p>
                            <img className="preview" src={todo} alt="to do list Preview" />
                        </div>
                        <div className="third-text">
                            <p className="chip">React TS</p>
                            <p className="chip">ShadCN UI</p>
                            <p className="chip">Firestore</p>
                            <p className="chip">Tailwind CSS</p>
                        </div>
                    </div>
                </a>
                <a href='https://falconcams.web.app/' target='_blank' rel="noopener noreferrer">
                    <div className="card green">
                        <p className="tip">Falcon Cameras</p>
                        <div className='content'>
                            <p className="second-text">
                                This is a project done based on Frontend with dummy database. Used React JS along with Material UI to make this app responsive with dummy JSON database hosted in Firebase Realtime Database and hosted with Firebase Hosting.
                            </p>
                            <img className="preview" src={falconcams} alt="Falcon Camera Preview" />
                        </div>
                        <div className="third-text">
                            <p className="chip">React JS</p>
                            <p className="chip">Material UI</p>
                            <p className="chip">Firebase Realtime DB</p>
                            <p className="chip">JavaScript</p>
                        </div>
                    </div>
                </a>
                <a href='https://hyrivoapp.web.app/' target='_blank' rel='noopener noreferrer'>
                    <div className="card cyan">
                        <p className="tip">Hyrivo App</p>
                        <div className='content'>
                            <p className="second-text">
                                A fullstack job-seeking platform developed using React.js for the frontend, Express.js for the backend, and MongoDB as the database, designed to connect job seekers with opportunities.
                            </p>
                            <img className="preview" src={hyrivoapp} alt="hyrivo app Preview" />
                        </div>
                        <div className="third-text">
                            <p className="chip">HTML</p>
                            <p className="chip">CSS</p>
                            <p className="chip">React JS</p>
                            <p className="chip">Material UI</p>
                            <p className="chip">JavaScript</p>
                            <p className="chip">Express JS</p>
                            <p className="chip">Mongo DB</p>
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}
