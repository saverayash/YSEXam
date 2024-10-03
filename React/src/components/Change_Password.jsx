import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [Old_Password, setOldPassword] = useState('');
    const [New_Password, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handlePassChange = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/change', {
                Old_Password:Old_Password,
                New_Password:New_Password,
            });
            

            if (response.status === 200) {
                alert('Password changed successfully!');
                navigate('/'); 
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data}`);
            } else {
                alert('An error occurred while changing the password.');
            }
        }
    };

    return (
        <>
            <h2>Change Password</h2>
            <form id="change_password_form" onSubmit={handlePassChange}>
                <label htmlFor="oldPassword">Old Password</label><br />
                <input
                    type="password"
                    id="Old_Password"
                    name="oldPassword"
                    value={Old_Password}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                /><br /><br />

                <label htmlFor="newPassword">New Password</label><br />
                <input
                    type="password"
                    id="New_Password"
                    name="newPassword"
                    value={New_Password}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                /><br /><br />

                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default ChangePassword;
