import React from 'react';
import { Link } from 'react-router-dom'
import Header from "../components/common/Header";
import BudgetList from "../components/planBudget/BudgetList"
import { Button } from 'antd';

const Planbudget = () => {
  const reloadPage = () => {
    window.location.reload();
  }

  return (
    <div>
     <div>
      <Header/>
      <Button onClick={reloadPage}><Link to="/plan">뒤로가기</Link></Button>
      <BudgetList/>
      </div>
    </div>
  );
};

export default Planbudget;
