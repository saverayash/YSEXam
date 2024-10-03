import React from 'react';
import { useNavigate } from 'react-router-dom';

function User() {
    const navigate = useNavigate();
    
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
            <button onClick={handleClick1}>Ask Doubt</button>
            <button onClick={handleClick2}>Privious Exmas</button>
            <button onClick={handleClick3}>Exams</button>
            <button onClick={handleClick4}>Change Password</button>
        </>
    );
}

export default User;
