import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function Admin()
{
    const [userData,setUserData]=useState(null);
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
    }, []);
    const navigate=useNavigate();
    const handle1 = () => {
        console.log("Navigating to Change Password");
        navigate('/change_password');
    };
    
    const handle2 = () => {
        console.log("Navigating to Add Another Person");
        navigate('/add_another');
    };
    
    return(
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
        <button onClick={handle1}>Change Password</button>
        <button onClick={handle2}>Add Another Person</button>
        </>
    );
}

export default Admin;