import React, { useState } from 'react';
import axios from 'axios';

function Check_Exam_Paper() {
  const [title, setTitle] = useState('');

  // Handle the submit to publish the exam result
  const handlePublish = async () => {
    if (!title) {
      alert('Please enter a title.');
      return;
    }

    const data = { title };

    try {
      const response = await axios.post('http://localhost:3000/check_exam_paper', data);
      console.log('Exam result published:', response.data);
      alert('Result published successfully!');
    } catch (error) {
      console.error('Error publishing result:', error);
      alert('Error publishing result. Please try again.');
    }
  };

  return (
    <>
      <h3>Do you want to publish the result?</h3>
      <div>
        <label>Enter Exam Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter exam title"
        />
      </div>
      <button onClick={handlePublish}>Publish</button>
    </>
  );
}

export default Check_Exam_Paper;
