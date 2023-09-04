import {React,useState} from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./Popular.module.css";
import axios from "axios";

const Report = () => {
  return (
  <div>
    <div className={styles.scheduleNIcon}>
      <p className={styles.scheduleTitle}>지금 내 근처 인기있는 장소는?</p>
    </div>
    <div className={styles.scheduleDiv}>     
      <p className={styles.schedule}>2023.08.25 - 2023.08.27</p>
    </div>
  </div>
  );
};

export default Report;
