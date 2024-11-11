import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Give_Exam() {
    const { id } = useParams(); // Get exam ID from URL
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [responses, setResponses] = useState({});

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await axios.get(`http://localhost:5173/give_exam/${id}`);
                setExam(response.data);
                setLoading(false);
            } catch (e) {
                setError('Error fetching exam details');
                setLoading(false);
            }
        };
        fetchExam();
    }, [id]);

    const handleResponseChange = (questionId, value) => {
        setResponses(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = async () => {
        try {
            await axios.post(`http://localhost:3000/give_exam/submit`, { examId: id, responses });
            alert('Responses submitted successfully');
        } catch (e) {
            alert('Error submitting responses');
        }
    };

    if (loading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h3>Error: {error}</h3>;
    }

    return (
        <>
            <h3>{exam.Title}</h3>
            <p>Total Marks: {exam.Total_Marks}</p>
            <p>Instructions: {exam.Instruction}</p>
            <form>
                {exam.Questions.map((question, index) => (
                    <div key={index}>
                        <h4>{question.text}</h4>
                        {question.type === 'MCQ' ? (
                            question.options.map((option, i) => (
                                <label key={i}>
                                    <input
                                        type="radio"
                                        name={question._id}
                                        value={option}
                                        onChange={() => handleResponseChange(question._id, option)}
                                    />
                                    {option}
                                </label>
                            ))
                        ) : (
                            <input
                                type="text"
                                onChange={(e) => handleResponseChange(question._id, e.target.value)}
                            />
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
        </>
    );
}

export default Give_Exam;
