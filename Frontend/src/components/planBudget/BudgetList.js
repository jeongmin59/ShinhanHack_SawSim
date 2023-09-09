import React, { useState } from 'react';
import CreateBudget from './CreateBudget';
// import styles from '../pages/Plan.module.css'

const BudgetList = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div>
      <h2>{isEditMode ? '예산 수정하기' : '예산 추가하기'}</h2>
      


      <CreateBudget />
    </div>
  );
}

export default BudgetList;
