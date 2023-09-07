import React from 'react';
import styles from '../pages/Plan.module.css'
import Header from '../components/common/Header'
import CalendarModal from '../components/plan/Calendar';
import DateList from '../components/plan/DateList';
import SelectedDate from '../components/plan/SelectedDate';

const Plan = () => {
  return (
    <div className={styles.container}>
      <Header />
      <CalendarModal />
      <DateList />
      <SelectedDate />
    </div>
  );
}

export default Plan;
