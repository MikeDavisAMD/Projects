export const AddSkillsUi = ({onAdd}) => {
    const handleAdd = () => {
        const inputEl = document.getElementById("input-field")
        const skill = inputEl.value.trim()

        if (skill) {
            onAdd(skill)
            inputEl.value = ""
            inputEl.focus()
        }
    }

    return (
        <>
        <style>{`
        .input-group {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
        justify-content: center;
        max-width: 160px;
        }

        .submit-button {
        font-size: 17px;
        padding: 0.5em 2em;
        border: transparent;
        box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24);
        background: #00BFFF;
        border-radius: 0 10px 10px 0;
        transition: 0.3s;
        }

        .submit-button:hover {
        transition: 0.3s;
        background:  linear-gradient(135deg, #4B0082, #BF00FF);
        cursor: pointer;
        }

        .submit-button:active {
        transform: translate(0em, 0.2em);
        }

        .submit-button span {
        font-weight: 800;
        letter-spacing: 2px;
        background:  linear-gradient(135deg, #4B0082, #BF00FF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: 0.3s;
        }

        .submit-button:hover span {
        background: #00BFFF;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: 0.3s;
        }

        #input-field {
        background-color: #00BFFF;
        border-radius: 10px 0 0 10px;
        border: none;
        width: 300px;
        padding-left: 8px;
        color: white;
        font-size: 14px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        ::placeholder {
        color:  #ffffff;
        }

        @media (max-width: 600px) {
        #input-field {
            width: 180px; 
        }
        .submit-button {
            padding: 0.5em 1.2em; 
            font-size: 15px;
        }
        }

        @media (max-width: 320px) {
        #input-field {
            width: 150px; 
        }
        }
        `}</style>

        <div className="input-group">
            <input placeholder="Enter your skills here" type="text" id="input-field"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}/>
            <button className="submit-button" onClick={handleAdd}><span>ADD</span></button>
        </div>
        </>
    )
}