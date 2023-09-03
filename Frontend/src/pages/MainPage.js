import React from 'react';
import styles from "./MainPage.module.css";
import Header from "../components/common/Header";
import BalanceSchedule from "../components/main/BalanceSchedule";
import Insurance from "../components/main/Insurance";

const MainPage = () => {
  return (
    <div className={styles.div}>
      <Header/>
      <BalanceSchedule/>
      <Insurance/>
    </div>
  );
};

export default MainPage;
