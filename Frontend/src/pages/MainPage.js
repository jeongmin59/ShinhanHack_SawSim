import React from 'react';
import styles from "./MainPage.module.css";
import Header from "../components/common/Header";
import BalanceSchedule from "../components/main/BalanceSchedule";
import Insurance from "../components/main/Insurance";
import {Link} from "react-router-dom"

const MainPage = () => {
  return (
    <div className={styles.div}>
      <Header/>
      <BalanceSchedule/>
      <Insurance/>
      <Link to='/portfolio'>포트폴리오</Link>
    </div>
  );
};

export default MainPage;
