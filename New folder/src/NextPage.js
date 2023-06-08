import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

const NextPage = () => {
  const history = useHistory();
  const { textData } = history.location.state;

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="container">
      <h1 className="title">Next Page</h1>
      <p className="text">{textData}</p>
      <button onClick={handleGoBack} className="button">
        Go Back
      </button>
    </div>
  );
};

export default NextPage;
