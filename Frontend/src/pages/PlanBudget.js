import React from 'react';
import Header from '../components/common/Header'
import styles from "./PlanBudget.module.css";
import BudgetList from '../components/planBudget/BudgetList';

const PlanBudget = () => {
  return (
    <div className={styles.container}>
      <Header />
      <BudgetList />
    </div>
  );
}

export default PlanBudget;