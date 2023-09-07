import React from 'react';
import Header from '../components/common/Header'
import styles from "./PlanBudget.module.css";
import CreateBudget from '../components/planBudget/CreateBudget';

const PlanBudget = () => {
  return (
    <div className={styles.container}>
      <Header />
      <CreateBudget />
    </div>
  );
}

export default PlanBudget;