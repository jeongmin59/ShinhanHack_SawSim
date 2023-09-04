import React from 'react';
import styles from "./Budget.module.css";
import Header from "../components/common/Header";
import Report from "../components/budget/Report";
import Popular from "../components/budget/Popular";

const Budget = () => {
  return (
    <div className={styles.div}>
      <Header/>
      <Report/>
      <Popular/>
    </div>
  );
};

export default Budget;
