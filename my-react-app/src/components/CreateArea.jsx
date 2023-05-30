import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Zoom } from "@mui/material";
import { click } from "@testing-library/user-event/dist/click";



function CreateArea(props) {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });
    const [clicked, setClick] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }

    function submitNote(event) {
        props.onAdd(note);
        setNote({
            title: "",
            content: ""
        });
        event.preventDefault();
    }

    function handleClick(event) {
        setClick(true);
    }

    return (
        <div>
            <form className="create-note">
                {clicked && <input
                    name="title"
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title"
                />}
                <textarea
                    name="content"
                    onClick={handleClick}
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    rows={clicked ? "3" : "1"}
                />
                <Zoom in={clicked && true}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
