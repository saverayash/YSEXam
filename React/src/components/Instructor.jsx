import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function Instructor()
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
    const handle1=()=>{
        navigate('/change_password');
    };
    const handle2=()=>{
      navigate('/add_exam_paper');
    };
    const handle3=()=>{
        navigate('/check_exam_paper');
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
        <button onClick={handle1}>Change Password</button><br/>
        <button onClick={handle2}>Create a Exam Paper</button><br/>
        <button onClick={handle3}>Check a Exam Paper</button><br/>
        
        </>
    );
}
export default Instructor;