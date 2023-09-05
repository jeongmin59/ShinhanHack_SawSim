import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Plan from './pages/Plan'
import Login from './pages/Login'
import MainPage from './pages/MainPage'
import Budget from './pages/Budget'
import Cash from './pages/Cash'
import TransactionDetail from './pages/TransactionDetail'
import PlanBudget from './pages/PlanBudget'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/main' element={<MainPage/>}/>
        <Route exact path='/plan' element={<Plan/>}/>
        <Route exact path='/budget' element={<Budget/>}/>
        <Route exact path='/cash' element={<Cash/>}/>
        <Route exact path='/transaction' element={<TransactionDetail/>}/>
        <Route exact path='/planbudget' element={<PlanBudget/>}/>
      </Routes>
    </div>
  );
}

export default App;
