import { Link } from "react-router-dom";

function NavBar() {
    
    return(
        <>
        <div className="navbar">
        <Link to='/api/auth/register'>
            <h3>Register</h3>
        </Link>
        <Link to='/api/auth/login'>
            <h3>Login</h3>
        </Link>
        <h1>The Lokerroom</h1>
        <Link to='/api/messages/new'>
            <h3>New Message</h3>
        </Link>
        <Link to='/api/lobby'>
        <h3>Lobby</h3>
        </Link>
        </div>
        </>
    )
}

export default NavBar