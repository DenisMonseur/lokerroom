import { useState } from "react";

function CreateLobby() {
    
    const [lobbyName, setLobbyName] = useState('')
    const [responseMessage, setResponseMessage] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwtToken');

            const response = await fetch ('http://localhost:3000/api/lobby',{
            method:'POST',
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                lobby_name: lobbyName,
            }),
            })
            const data = await response.json()
            setResponseMessage (data.msg || data.err)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={submit}>
            <input type="text" id="lobby" value={lobbyName}
            placeholder="Enter new lobby name"
             onChange={(e) => setLobbyName(e.target.value)} />
            <button type="submit">Create lobby</button>
            <p>{responseMessage}</p>
        </form>
    )
}

export default CreateLobby
