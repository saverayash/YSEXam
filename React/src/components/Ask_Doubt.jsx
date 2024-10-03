import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Ask_Doubt() {
  const [doubt, setDoubt] = useState(''); // Renaming the state variable to 'doubt'
  const navigate = useNavigate(); // Ensure navigate is called inside the component

  const handler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/ask', {
        Text: doubt, // Sending the correct state value
      });
      if (response.status === 200 || response.status === 201) { // Checking both 200 and 201 status codes
        alert('Your doubt was placed successfully, we will try our best to answer your question');
        navigate('/ask_doubt');
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('An error occurred while submitting your doubt');
      }
    }
  };

  return (
    <>
      Ask_Doubt<br/>
      <form id="Ask_DoubtForm" onSubmit={handler}>
        <label htmlFor="Doubt">Doubt</label><br/>
        <input 
          type="text" 
          id="Doubt" 
          name="Doubt" 
          value={doubt} // Ensure that the state value matches the input
          onChange={(e) => setDoubt(e.target.value)} 
          required 
        /><br/>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default Ask_Doubt;
