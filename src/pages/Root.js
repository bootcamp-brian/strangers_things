import { Outlet, Link } from "react-router-dom";
import { useState } from 'react'

export default function Root() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    console.log(token)

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <Link to="posts">Posts</Link>
                        <Link to="profile">Profile</Link>
                        <Link to="register">Register</Link>
                        <Link to="login">Login</Link>
                        <Link to="logout">Logout</Link>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </> 
    );
}