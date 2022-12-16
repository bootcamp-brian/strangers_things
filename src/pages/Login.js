import { useState } from 'react';
import { loginUser } from '../utils/API';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useOutletContext();
    const navigate = useNavigate();

    const submitLogin = async (event) => {
        event.preventDefault();
        const data = await loginUser({ username, password });
            if (data.success) {
                localStorage.setItem('token', data.data.token);
                setToken(data.data.token);
                setUsername('');
                setPassword('');
                setErrorMessage('');
                navigate("/posts");
            } else {
                setErrorMessage(data.error.message);
            }
    }

    return <div className="page">
        <form className="login" onSubmit={submitLogin}>
            <section>
                <label htmlFor="username">Username:</label>
                <br/>
                <input
                    id="username"
                    type="text"
                    placeholder="enter username..."
                    required
                    value={username}
                    onChange={event => setUsername(event.target.value)}/>
            </section>
            <section>
                <label htmlFor="password">Password:</label>
                <br/>
                <input
                    id="password"
                    type="password"
                    placeholder="enter password..."
                    required
                    value={password}
                    onChange={event => setPassword(event.target.value)}/>
            </section>
            <button type="submit">Login</button>
            <p>{errorMessage}</p>
        </form>
    </div>
}


export default Login