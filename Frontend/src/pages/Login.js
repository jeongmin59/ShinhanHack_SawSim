import React from 'react';
import styles from "./Login.module.css";
import Header from "../components/common/Header";
import TransferOne from "../components/login/TransferOne";
import login from "./login.png";

const Login = () => {
  return (
    <div className={styles.container}>
      <Header/><br/><br/>
      <img alt="money" src={login} className={styles.money}/>
      <p className={styles.ment1}>1원 이체를 통해 계좌를 인증하고,</p>
      <p className={styles.ment2}><span className={styles.soltrip}>쏠트립</span>을 이용해보세요!</p>
      <TransferOne/>
    </div>
  )
}

export default Login