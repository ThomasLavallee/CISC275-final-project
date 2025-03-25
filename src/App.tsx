import React from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import {BasicQuiz} from './pages/BasicQuiz'
import { DetailedQuiz } from './pages/DetailedQuiz';

function App(): React.JSX.Element {
  // Routing info to go to the correct page
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/BasicQuiz" element={<BasicQuiz />}></Route>
          <Route path="/DetailedQuiz" element={<DetailedQuiz />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
