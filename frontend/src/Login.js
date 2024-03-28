import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Make sure this path is correct

const LoginPage = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth(); // Correctly include setUser
    const [username, setUsernameLocal] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/validateLogin', { username, password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const userId = response.data.user_id;
                localStorage.setItem('userToken', userId);
                localStorage.setItem('username', username);
                setUser({ id: userId, username: username });

                navigate('/');
            })
            .catch(err => {
                setError('Invalid username or password');
                console.error('Login error', err);
            });
    };

    const handleCreateAccount = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Log In</h4>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsernameLocal(e.target.value)} // Use the renamed local state setter
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Log In</button>
                                    <button onClick={handleCreateAccount} className="btn btn-secondary">Create An Account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
