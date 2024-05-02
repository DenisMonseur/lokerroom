import { useState } from "react";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [resMessage, setResMessage] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await fetch ('http://localhost:3000/api/auth/login',{
            method:'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
        
        const data = await response.json()
        console.log(data)
        if (response.ok) {
                localStorage.setItem('jwtToken', data.token);
                localStorage.setItem('user_id', data.user_id);
            }
        setResMessage(data.message || data.error)
        
        
    } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <form onSubmit={submit} className="login">
            <h2>Login</h2>
            <label htmlFor="email"> email :</label>
            <input type="text"  id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <label htmlFor="password"> password :</label>
            <input type="text"  id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            <p className="alert">{resMessage}</p>
        </form>
        </>
    )
}

export default Login