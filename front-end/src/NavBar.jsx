import { Link } from "react-router-dom";

function NavBar() {
    
    return(
        <>
        <div className="navbar">
        <div className="left">
            <Link to='/api/lobby' className="link" id="jeLesBrise">
        <h3>Chat room</h3>
        </Link>
        </div>
        <h1>The LokerRoom</h1>
        <div className="right">
            <Link to='/api/auth/login' className="link">
            <h3>Login</h3>
        </Link>
        <Link to='/api/auth/register' className="link">
            <h3>Register</h3>
        </Link>
        </div>
        </div>
        </>
    )
}

export default NavBar