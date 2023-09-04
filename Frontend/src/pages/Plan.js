import React from 'react';
import styles from '../pages/Plan.module.css'
import Header from '../components/common/Header'
import TripDate from '../components/plan/TripDate';
import DailyBudget from '../components/plan/DailyBudget';

const Plan = () => {
  return (
    <div className={styles.container}>
      <Header />
      <TripDate />
      <DailyBudget />
    </div>
  );
}

export default Plan;
