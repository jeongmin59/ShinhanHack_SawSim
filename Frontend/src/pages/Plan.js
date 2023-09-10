import React from 'react';
import styles from '../pages/Plan.module.css'
import Header from '../components/common/Header'
import CalendarModal from '../components/plan/Calendar';
import SelectedDate from '../components/plan/SelectedDate';
import DateList from '../components/plan/DateList';

const Plan = () => {
  return (
    <div className={styles.container}>
      <Header />
      <CalendarModal />
      <SelectedDate />
      <DateList />
    </div>
  );
}

export default Plan;
