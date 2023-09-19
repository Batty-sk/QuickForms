import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {Link} from 'react-router-dom'
import './Signin.css'

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    
    const auth = getAuth(); // Get the authentication instance

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            setMessage('Login Successful!');
            console.log('user:', user);

            localStorage.setItem('accessToken', user.accessToken);
            localStorage.setItem('refreshToken', user.refreshToken);

            //history.push('/home'); // Redirect to the home route
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    }

    return (
        <div className="container mono">
        <div className="row justify-content-center">
            <div className="col-12 signin-container ">
                <div className="card signin-card">
                    <div className="card-body w-100">
                        <h2 className="card-title signin-title pb-4">Sign In</h2>
                        <form onSubmit={handleSignIn}>
                            <div className="mb-3">
                                <input type="email" className="form-control signin-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                           </div>
                            <div className="mb-3">
                                <input type="password" className="form-control signin-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary signin-button">Sign In</button>
                        </form>
                        {message && <p className="mt-3 signin-message">{message}</p>}
                        <p className="mt-3 signin-link">Don't have an account? <Link to="/auth/signup">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Signin;
