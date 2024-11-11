import React, { useState } from 'react';
import axios from 'axios';

function Add_Exam_Paper() {
  const [title, setTitle] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [instructions, setInstructions] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState([]);
  
  const [questionType, setQuestionType] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [marks, setMarks] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [rangeMin, setRangeMin] = useState('');
  const [rangeMax, setRangeMax] = useState('');
  const [options, setOptions] = useState(['']);
  const [isSCQ, setIsSCQ] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [negativeMarking, setNegativeMarking] = useState(false);
  const [negativePercentage, setNegativePercentage] = useState('');

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = options.map((opt, i) => (i === index ? value : opt));
    setOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    if (!questionText || !marks) {
      alert('Please fill out all required fields.');
      return;
    }

    const newQuestion = {
      questionType,
      questionText,
      questionMarks: parseInt(marks),
      correctAnswer: questionType === 'choice' ? selectedAnswers : correctAnswer,
      range: questionType === 'integer' ? [parseInt(rangeMin), parseInt(rangeMax)] : null,
      options: questionType === 'choice' ? options : null,
      isSCQ: questionType === 'choice' ? isSCQ : null,
      negativeMarking,
      negativePercentage: negativeMarking ? parseFloat(negativePercentage) : null,
    };

    setQuestions([...questions, newQuestion]);
    resetQuestionFields();
  };

  const resetQuestionFields = () => {
    setQuestionType('');
    setQuestionText('');
    setMarks('');
    setCorrectAnswer('');
    setRangeMin('');
    setRangeMax('');
    setOptions(['']);
    setIsSCQ(true);
    setSelectedAnswers([]);
    setNegativeMarking(false);
    setNegativePercentage('');
  };

  const handleSubmit = async () => {
    const examData = {
      title,
      totalMarks,
      instructions,
      startTime,
      endTime,
      duration,
      questions,
    };

    try {
      const response = await axios.post('http://localhost:3000/add_exam_paper', examData);
      console.log('Exam submitted successfully:', response.data);
      setTitle('');
      setTotalMarks('');
      setInstructions('');
      setStartTime('');
      setEndTime('');
      setDuration('');
      setQuestions([]);
    } catch (error) {
      console.error('Error submitting exam:', error);
    }
  };

  const handleAnswerSelection = (answer) => {
    if (isSCQ) {
      setSelectedAnswers([answer]);
    } else {
      setSelectedAnswers((prevAnswers) =>
        prevAnswers.includes(answer)
          ? prevAnswers.filter((ans) => ans !== answer)
          : [...prevAnswers, answer]
      );
    }
  };

  return (
    <>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Total Marks:</label>
          <input
            type="number"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Duration (minutes):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Question Type:</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            required
          >
            <option value="" disabled>Select question type</option>
            <option value="text">Text</option>
            <option value="integer">Integer</option>
            <option value="choice">Choice type</option>
          </select>
        </div>

        {questionType && (
          <div>
            <label>Question Text:</label>
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <label>Marks:</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            required
          />
        </div>

        {questionType === 'choice' && (
          <div>
            <label>Options:</label>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={handleAddOption}>Add Option</button>

            <div>
              <label>
                <input
                  type="checkbox"
                  checked={isSCQ}
                  onChange={() => setIsSCQ(!isSCQ)}
                />
                Single Choice Question (SCQ)
              </label>
            </div>

            <div>
              <label>Correct Answer(s):</label>
              {options.map((option, index) => (
                <div key={index}>
                  <label>
                    <input
                      type={isSCQ ? 'radio' : 'checkbox'}
                      checked={selectedAnswers.includes(option)}
                      onChange={() => handleAnswerSelection(option)}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {questionType === 'integer' && (
          <div>
            <label>Range:</label>
            <input
              type="number"
              placeholder="Min"
              value={rangeMin}
              onChange={(e) => setRangeMin(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              value={rangeMax}
              onChange={(e) => setRangeMax(e.target.value)}
            />
          </div>
        )}

        <div>
          <label>
            <input
              type="checkbox"
              checked={negativeMarking}
              onChange={() => setNegativeMarking(!negativeMarking)}
            />
            Negative Marking
          </label>
          {negativeMarking && (
            <input
              type="number"
              placeholder="Negative Marking %"
              value={negativePercentage}
              onChange={(e) => setNegativePercentage(e.target.value)}
            />
          )}
        </div>

        <button type="button" onClick={handleAddQuestion}>Add Question</button>
      </form>

      <button type="button" onClick={handleSubmit}>Submit Exam</button>

      {/* Display added questions */}
      <div>
        <h3>Added Questions:</h3>
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
              <p><strong>Question {index + 1}:</strong> {q.questionText}</p>
              <p>Type: {q.questionType}</p>
              <p>Marks: {q.questionMarks}</p>
              {q.questionType === 'choice' && (
                <div>
                  <p>Options:</p>
                  <ul>
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                  <p>Correct Answer(s): {q.correctAnswer.join(', ')}</p>
                  <p>Single Choice: {q.isSCQ ? 'Yes' : 'No'}</p>
                </div>
              )}
              {q.questionType === 'integer' && (
                <p>Range: {q.range[0]} - {q.range[1]}</p>
              )}
              {q.negativeMarking && (
                <p>Negative Marking: {q.negativePercentage}%</p>
              )}
            </div>
          ))
        ) : (
          <p>No questions added yet.</p>
        )}
      </div>
    </>
  );
}

export default Add_Exam_Paper;
