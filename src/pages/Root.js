import { Outlet, Link } from "react-router-dom";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Root() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token');
        setToken('');
        navigate("/logout");
    }

    return (
        <>
            <header>
                <nav>
                    <ul>
                        {
                            token && <>
                                <Link to="posts">Posts</Link>
                                <Link to="profile">Profile</Link>
                                <button onClick={logout}>Logout</button>
                            </>
                        }
                        {
                            !token && <>
                                <Link to="register">Register</Link>
                                <Link to="login">Login</Link>
                            </>
                        }
                    </ul>
                </nav>
            </header>
            <Outlet context={[token, setToken]}/>
        </> 
    );
}