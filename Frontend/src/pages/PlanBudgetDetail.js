import React from 'react';
// import { Link } from 'react-router-dom'
import Header from "../components/common/Header";
import CreateBudget from '../components/planBudget/CreateBudget';

const PlanBudgetDetail = () => {

  return (
    <div>
     <div>
      <Header/>
      <CreateBudget />
      </div>
    </div>
  );
};

export default PlanBudgetDetail;