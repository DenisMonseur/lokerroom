import { useState } from "react"

function NewMessage() {
    const [message, setMessage] = useState('')
    const [resMessage, setResMessage] = useState('')

    const submit = async (e) =>{
        e.preventDefault()

        try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch ('http://localhost:3000/api/messages/new',{
            method:'POST',
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                content: message,
            }),
        })

        const data = await response.json()
        console.log(data);
        setResMessage(data.msg || data.err)
        

    } catch (error) {
        console.error(error);
    }
    }

    return (
        <>
        <form onSubmit={submit} className="newMessage">
            <label htmlFor="content">New Message:</label>
            <input type="text" id="content" onChange={(e) => setMessage(e.target.value)}/>
            <button type="submit">Send</button>
            <p>{resMessage}</p>
        </form>
        </>
    )
}


export default NewMessage