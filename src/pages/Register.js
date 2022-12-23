import { useState } from 'react';
import { registerUser } from '../utils/API';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useOutletContext();
    const navigate = useNavigate();

    const submitRegistration = async (event) => {
        event.preventDefault();
        if (password === passwordConfirm) {
            const data = await registerUser({ username, password });
            if (data.success) {
                localStorage.setItem('token', data.data.token);
                setToken(data.data.token);
                setUsername('');
                setPassword('');
                setPasswordConfirm('');
                setErrorMessage('');
                navigate("/posts");
            } else {
                setErrorMessage(data.error.message);
            }
        } else {
            setErrorMessage('Passwords must match');
        }
    }

    return <div className="page">
        <h2>Register</h2>
        <form className="register" onSubmit={submitRegistration}>
            <section>
                <label htmlFor="username">Username:</label>
                <br/>
                <input
                    id="username"
                    type="text"
                    placeholder="enter username..."
                    minLength="5"
                    required
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
            </section>
            <section>
                <label htmlFor="password">Password:</label>
                <br/>
                <input
                    id="password"
                    type="password"
                    placeholder="enter password..."
                    minLength="8"
                    required
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </section>
            <section>
                <label htmlFor="passwordConfirm">Confirm Password:</label>
                <br/>
                <input
                    id="passwordConfirm"
                    type="password"
                    placeholder="re-enter password..."
                    minLength="8"
                    required
                    value={passwordConfirm}
                    onChange={event => setPasswordConfirm(event.target.value)}
                />
            </section>
            <button type="submit">Register</button>
            <p>{errorMessage}</p>
        </form>
    </div>
}

export default Register;