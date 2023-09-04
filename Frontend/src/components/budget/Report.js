import {React,useState} from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./Report.module.css";
import axios from "axios";

const Report = () => {
  return (
  <div>
    <p className={styles.tripCalendarTitle}>예산 실시간 분석</p>
    <div className={styles.calendarDiv}>
      <p className={styles.ment}>여행 3일차</p>
      <p className={styles.ment}>오늘 예산의 75%인 12,000원을 사용하셨네요!</p>
    </div>
  </div>
  );
};

export default Report;
