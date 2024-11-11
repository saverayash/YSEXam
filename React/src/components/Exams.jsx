import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Exams() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axios.post('http://localhost:3000/exams');
                setExams(response.data);
                setLoading(false);
            } catch (e) {
                setError('Error fetching exams');
                setLoading(false);
            }
        };
        fetchExams();
    }, []);

    if (loading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h3>Error: {error}</h3>;
    }

    const handle1 = (id) => {
        navigate('/give_exam/${id}'); // Navigate to the page with exam ID in the URL
    };

    return (
        <>
            <h3>Exams Running in System</h3>
            <br />
            <table border="1" style={{ width: '100%', textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Total Marks</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Duration</th>
                        <th>Instructions</th>
                    </tr>
                </thead>
                <tbody>
                    {exams.map((exam, index) => (
                        <tr key={index}>
                            <td>
                                <button
                                    onClick={() => handle1(exam._id)} // Make Title clickable
                                    style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'blue', textDecoration: 'underline' }}
                                >
                                    {exam.Title}
                                </button>
                            </td>
                            <td>{exam.Total_Marks}</td>
                            <td>{new Date(exam.Start_Time).toLocaleString()}</td>
                            <td>{new Date(exam.End_Time).toLocaleString()}</td>
                            <td>{exam.Time} minutes</td>
                            <td>{exam.Instruction}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Exams;
