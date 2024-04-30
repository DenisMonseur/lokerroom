
import { useState } from "react"

function Register() {
    
    const [email, setEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [resMessage, setResMessage] = useState('')
    
    const submit = async (e) =>{
        e.preventDefault()
        
        try {
        const response = await fetch ('http://localhost:3000/api/auth/register',{
            method:'POST',
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                nickname: nickname,
                password: password,
            }),
        })

        const data = await response.json()
        console.log(data);
        setResMessage(data.info || data.error)
    } catch (error) {
        console.error(error);
    }
    }
    
    return (
        <>
        <form onSubmit={submit} className="register">
            <label htmlFor="email">email :</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="nickname">nickname :</label>
            <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
            <label htmlFor="password">password :</label>
            <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">register</button>
            <p className="alert">{resMessage}</p>
        </form>
        </>
    )
}

export default Register