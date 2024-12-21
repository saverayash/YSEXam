import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar_User = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const styles = {
        sidebarOpen: {
            width: '250px',
            backgroundColor: '#2c3e50',
            color: 'white',
            padding: '20px',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
            transition: 'width 0.3s',
        },
        sidebarCollapsed: {
            width: '50px',
            backgroundColor: '#2c3e50',
            color: 'white',
            padding: '10px 5px',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
            transition: 'width 0.3s',
            textAlign: 'center',
        },
        toggleButton: {
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            marginBottom: '20px',
        },
        menu: {
            listStyleType: 'none',
            padding: 0,
        },
        menuItem: {
            fontSize: '1rem',
            padding: '10px 15px',
            cursor: 'pointer',
            borderRadius: '5px',
            marginBottom: '10px',
            transition: 'background 0.3s',
        },
    };

    return (
        <div style={isSidebarOpen ? styles.sidebarOpen : styles.sidebarCollapsed}>
            <button
                onClick={toggleSidebar}
                style={{
                    ...styles.toggleButton,
                    marginLeft: isSidebarOpen ? '200px' : '0px',
                }}
            >
                {isSidebarOpen ? '❮❮❮' : '❯❯❯'}
            </button>

            {isSidebarOpen && (
                <ul style={styles.menu}>
                    <li onClick={() => handleNavigation('/exams')} style={styles.menuItem}>Exams</li>
                    <li onClick={() => handleNavigation('/privious_exams')} style={styles.menuItem}>Previous Exams</li>
                    <li onClick={() => handleNavigation('/ask_doubt')} style={styles.menuItem}>Ask Doubt</li>
                    <li onClick={() => handleNavigation('/change_password')} style={styles.menuItem}>Change Password</li>
                    <li onClick={() => handleNavigation('/')} style={styles.menuItem}>Log Out</li>
                </ul>
            )}
        </div>
    );
};

export default Sidebar_User;
