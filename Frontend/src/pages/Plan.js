import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Plan.module.css'
import Header from '../components/common/Header'
import Calendar from '../components/plan/Calendar';
import SelectedDate from '../components/plan/SelectedDate';

const Plan = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.titles}>
        <Link className={styles.backLink} to='/main'><p className={styles.toBack}>&lt;</p>
        <p className={styles.title}>메인</p></Link> 
      </div>
      <Calendar />
      <SelectedDate />
    </div>
  );
}

export default Plan;