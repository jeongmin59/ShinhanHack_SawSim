import React from 'react';
import Header from '../components/common/Header'
import styles from "./PlanBudget.module.css";
import BudgetCreate from '../components/plan/BudgetCreate';

const PlanBudget = () => {
  return (
    <div className={styles.container}>
      <Header />
      <BudgetCreate />
    </div>
  );
}

export default PlanBudget;