import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Instructor()
{
    const navigate=useNavigate();
    const handle1=()=>{
        navigate('/change_password');
    };
    return(
        <>
        <button onClick={handle1}>Change Password</button>
        </>
    );
}
export default Instructor;