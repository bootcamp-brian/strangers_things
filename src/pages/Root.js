import { Outlet, Link } from "react-router-dom";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Root() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token');
        setToken('');
        // navigate("/logout");
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
                                <Link className ="lastNav" onClick={logout} to="logout">Logout</Link>
                                {/* <button className="logoutButton" onClick={logout}>Logout</button> */}
                            </>
                        }
                        {
                            !token && <>
                                <Link to="register">Register</Link>
                                <Link className="lastNav" to="login">Login</Link>
                            </>
                        }
                    </ul>
                </nav>
                <h1>Stranger's Things</h1>
            </header>
            <Outlet context={[token, setToken]}/>
        </> 
    );
}