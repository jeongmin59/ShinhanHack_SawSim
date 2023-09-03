import React from 'react';
import styles from '../pages/Plan.module.css'
import Header from '../components/common/Header'
import Calendar from '../components/plan/Calendar';
import DailyBudget from '../components/plan/DailyBudget';

const Plan = () => {
  return (
    <div className={styles.divContainer}>
      <Header />
      <p>여행 일정</p>
      <Calendar />
      <DailyBudget />
    </div>
  );
}

export default Plan;
