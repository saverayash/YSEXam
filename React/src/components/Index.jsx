import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Index() {
    const [Id, setId] = useState('');
    const [Password, setPassword] = useState('');
    const [Mail_Id, setMailId] = useState('');
    const [Education, setEducation] = useState('');
    const [isSignup, setIsSignup] = useState(false); // Track whether to show login or signup
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                id: Id,
                password: Password
            });

            if (response.status === 200) {
                const { role, token } = response.data; // Get the role and token from the response
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('role', role);
                if(role=="user")
                    navigate('/user');
                else if(role=='Admin')
                    navigate('/admin');
                else if(role=='Instructor')
                    navigate('/instructor');
                
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login.');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/signup', {
                id: Id,
                password: Password,
                mail_id: Mail_Id,
                education: Education
            });

            if (response.status === 201) {
                alert('User registered successfully!');
                // Reset form fields after successful signup
                setId('');
                setPassword('');
                setMailId('');
                setEducation('');
                setIsSignup(false); // Switch back to login form
            } else {
                alert(`Error: ${response.data}`);
            }
        } catch (error) {
            if (error.response) {
                // If the error is from the backend
                alert(`Error: ${error.response.data}`);
            } else {
                alert('An error occurred during signup.');
            }
        }
    };

    return (
        <>
            {isSignup ? (
                <form id="signupForm" onSubmit={handleSignup}>
                    <label>Sign Up</label><br />
                    <label htmlFor="Id">ID:</label><br />
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={Id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    /><br /><br />

                    <label htmlFor="Password">Password:</label><br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /><br /><br />

                    <label htmlFor="MailId">Mail ID:</label><br />
                    <input
                        type="email"
                        id="mail_id"
                        name="mail_id"
                        value={Mail_Id}
                        onChange={(e) => setMailId(e.target.value)}
                        required
                    /><br /><br />

                    <label htmlFor="Education">Education:</label><br />
                    <input
                        type="text"
                        id="education"
                        name="education"
                        value={Education}
                        onChange={(e) => setEducation(e.target.value)}
                        required
                    /><br /><br />

                    <input type="submit" value="Submit" />
                    <button type="button" onClick={() => setIsSignup(false)}>Switch to Login</button>
                </form>
            ) : (
                <form id="loginForm" onSubmit={handleSubmit}>
                    <label>Log In</label><br />
                    <label htmlFor="Id">ID:</label><br />
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={Id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    /><br /><br />

                    <label htmlFor="Password">Password:</label><br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /><br /><br />

                    <input type="submit" value="Submit" />
                    <button type="button" onClick={() => setIsSignup(true)}>Switch to Sign Up</button>
                    <h3>In case of any query please contact YSExam@gmail.com</h3>
                </form>
            )}
        </>
    );
}

export default Index;
