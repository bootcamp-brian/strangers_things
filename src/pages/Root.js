import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import logoleft from '../images/logoleft.png';
import logoright from '..//images/logoright.png';

export default function Root() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    function logout() {
        localStorage.removeItem('token');
        setToken('');
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
                <section className="logo">
                    <img src={logoleft} />
                    <h1>Stranger's Things</h1>
                    <img src={logoright} />
                </section>
            </header>
            <Outlet context={[token, setToken]}/>
        </> 
    );
}