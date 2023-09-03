import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Plan from './pages/Plan'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/plan' element={<Plan/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
