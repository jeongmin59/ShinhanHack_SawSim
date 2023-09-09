import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Cash.module.css";
import Header from "../components/common/Header";

const Cash = () => {
  return (
    <div>
      <Header/>
      <div className={styles.titles}>
        <Link className={styles.backLink} to='/budget'><p className={styles.toBack}>&lt;</p>
        <p className={styles.cashTitle}>현금 기록하기</p></Link> 
      </div>
    </div>
  )
}

export default Cash