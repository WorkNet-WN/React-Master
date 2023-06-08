import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

const HomePage = () => {
  const [textData, setTextData] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textData }),
      });

      if (!response.ok) {
        throw new Error('Failed to process data');
      }

      const { result } = await response.json();
      history.push('/next', { textData: result });
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message to the user
    }
  };

  

  return (
    <div className="container">
      <h1 className="title">Home Page</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={textData}
          onChange={(e) => setTextData(e.target.value)}
          className="input"
          placeholder="Enter text"
        />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HomePage;
