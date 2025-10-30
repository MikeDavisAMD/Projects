export const AddUi = ({ onAdd }) => {
    return (
        <>
            <style>
                {`
                    button {
                    width: 150px;
                    height: 50px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    background: #00BFFF;
                    border: none;
                    border-radius: 5px;
                    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
                    background: #00BFFF;
                    }

                    button,
                    button span {
                    transition: 200ms;
                    }

                    button .text {
                    transform: translateX(35px);
                    color: white;
                    font-weight: bold;
                    }

                    button .icon {
                    position: absolute;
                    border-left: 1px solid #00BFFF;
                    transform: translateX(110px);
                    height: 40px;
                    width: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    }

                    button svg {
                    width: 15px;
                    fill: #eee;
                    }

                    button:hover {
                    background: #FF6EC7;
                    }

                    button:active {
                    background: #00BFFF;
                    }

                    button:hover .text {
                    color: transparent;
                    }

                    button:hover .icon {
                    width: 150px;
                    border-left: none;
                    transform: translateX(0);
                    }

                    button:focus {
                    outline: none;
                    }

                    button:active .icon svg {
                    transform: scale(0.8);
                    }

                    .buttonSpan {
                    color: white;
                    margin: 150px;
                    font-size: 30px;
                    }
                `}
            </style>

            <button className="noselect" onClick={onAdd}>
            <span className="text">Add</span>
            <span className="icon"><svg
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg">
            </svg><span className="buttonSpan">+</span></span>
            </button>
        </>
    )
}