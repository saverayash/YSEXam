import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Index() {
    const [Id, setId] = useState('');
    const [Password, setPassword] = useState('');
    const [Mailid, setMailId] = useState('');
    const [Education, setEducation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                id: Id,
                password: Password
            });

            if (response.status === 200) {
                const { role } = response.data; // Get the role from the response
                // Handle successful login based on the user's role
                if (role === 'user') {
                    navigate('/user');
                } else if (role === 'admin') {
                    navigate('/admin');
                } else if (role === 'instructor') {
                    navigate('/instructor');
                }
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login.');
        }
    };

    const printSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/signup', {
                id: Id,
                password: Password,
                mail_id: Mailid,
                education: Education
            });

            if (response.status === 201) {
                alert('User registered successfully!');
                setId('');
                setPassword('');
                setMailId('');
                setEducation('');
            } else {
                alert(`Error: ${response.data}`);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred during signup.');
        }
    };
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/signup', {
                id: Id,
                password: Password,
                mail_id: Mailid,
                education: Education
            });
    
            if (response.status === 201) {
                alert('User registered successfully!');
                resetForm();
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
                <h3>In case of any query please contact YSExam@gmail.com</h3>
            </form>

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
                    value={Mailid}
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
            </form>
        </>
    );
}

export default Index;
