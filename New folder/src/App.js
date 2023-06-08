import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './HomePage';
import NextPage from './NextPage';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route path="/next" component={NextPage} />
    </Router>
  );
};

export default App;
