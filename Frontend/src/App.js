import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Plan from './pages/Plan'
import Login from './pages/Login'
import MainPage from './pages/MainPage'
import Budget from './pages/Budget'
import Cash from './pages/Cash'
import CashCreate from './pages/CashCreate'
import Transaction from './pages/Transaction'
import TransactionDetail from './pages/TransactionDetail'
import PlanBudget from './pages/PlanBudget'
import Dutch from './pages/Dutch'
import PopularPage from './pages/PopularPage'
import PortfolioPage from './pages/PortfolioPage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/main' element={<MainPage/>}/>
        <Route exact path='/plan' element={<Plan/>}/>
        <Route exact path='/budget' element={<Budget/>}/>
        <Route exact path='/cash' element={<Cash/>}/>
        <Route exact path='/cash/create' element={<CashCreate/>}/>
        <Route exact path='/transaction' element={<Transaction/>}/>
        <Route exact path='/transaction/detail' element={<TransactionDetail/>}/>
        <Route exact path='/planbudget' element={<PlanBudget/>}/>
        <Route exact path='/planbudget/:plan_id' element={<PlanBudget/>}/>
        <Route exact path='/dutch' element={<Dutch/>}/>
        <Route exact path='/popular' element={<PopularPage/>}/>
        <Route exact path='/portfolio' element={<PortfolioPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
