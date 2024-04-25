import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import IndexPHP from "./components/index_php";
import Planning from './components/planning';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route path="/" element={<Planning />} />
          <Route path="index_php" element={<IndexPHP />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
