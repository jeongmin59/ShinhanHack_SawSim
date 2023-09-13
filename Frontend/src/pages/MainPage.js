import React from 'react';
import styles from "./MainPage.module.css";
import Header from "../components/common/Header";
import BalanceSchedule from "../components/main/BalanceSchedule";
import Insurance from "../components/main/Insurance";
import PortBanner from "../components/main/PortBanner";

const MainPage = () => {
  return (
    <div className={styles.div}>
      <Header/>
      <BalanceSchedule/>
      <PortBanner/>
    </div>
  );
};

export default MainPage;
