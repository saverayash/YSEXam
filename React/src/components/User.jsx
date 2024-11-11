import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function User() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch token from localStorage (or any other storage)
        const token = localStorage.getItem('jwtToken');
        
        if (token) {
            // Decode the token to get the user data
            const decoded = jwtDecode(token);
            console.log('Decoded token:', decoded);

            // Set the decoded token data in the state
            setUserData(decoded);
        }
    }, []); // Empty dependency array to run only once on mount

    const handleClick1 = () => {
        navigate('/ask_doubt');
    };
    const handleClick2 = () => {
        navigate('/privious_exams');
    };
    const handleClick3 = () => {
        navigate('/exams');
    };
    const handleClick4 = () => {
        navigate('/change_password');
    };

    return (
        <>
            <div>
                <h1>User Profile</h1>
                {userData ? (
                    <div>
                        
                        <p>Mail_Id: {userData.Mail_Id}</p>
                       
                    </div>
                ) : (
                    <p>No user data found</p>
                )}
            </div>
            <button onClick={handleClick1}>Ask Doubt</button>
            <button onClick={handleClick2}>Previous Exams</button>
            <button onClick={handleClick3}>Exams</button>
            <button onClick={handleClick4}>Change Password</button>
        </>
    );
}

export default User;
