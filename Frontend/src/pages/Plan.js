import React from 'react';
import styles from '../pages/Plan.module.css'
import Header from '../components/common/Header'
import TripDate from '../components/plan/TripDate';
import DateList from '../components/plan/DateList';

const Plan = () => {
  return (
    <div className={styles.container}>
      <Header />
      <TripDate />
      <DateList />
    </div>
  );
}

export default Plan;
