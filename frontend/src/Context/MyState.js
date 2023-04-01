import { useState } from "react"
import MyContext from "./MyContext"

const MyState = (props) => {

    const host = 'http://localhost:5000/api'
    const initNotes = []

    const [notes, setNotes] = useState(initNotes);

    const fetchnotes = async () => {
        const url = `${host}/tasks`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();
        setNotes(json)
    }

    const addNote = async (title, description , status) => {

        const url = `${host}/newTask`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description,status })
        });

        const json = await response.json();
        setNotes(notes.concat(json));
    }

    const deleteNote = async (id) => {

        const url = `${host}/tasks/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const newnotes = notes.filter((note) => { return note._id !== id })
        setNotes(newnotes)
    }


    return (
        <MyContext.Provider value={{ notes, addNote, deleteNote, fetchnotes }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState
