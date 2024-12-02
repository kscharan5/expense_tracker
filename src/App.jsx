// import LandingPage from './components/Landingpage'
import Dashboard from './components/Dashboard';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin';

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;



