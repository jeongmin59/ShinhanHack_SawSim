import React from 'react';
import styles from "./Plan.module.css";
import Calendar from '../components/plan/Calendar';
import Header from "../components/common/Header"

const Plan = () => {
  return (
      <div>
        <Header/>
        <p>여행 일정</p>
        <div className={styles.divContainer}>
        <Calendar />
        </div>

      </div>
  )
}

export default Plan