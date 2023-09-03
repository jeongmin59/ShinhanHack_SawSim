import React from 'react';
import styles from "./MainPage.module.css";


const MainPage = () => {
  return (
    <div className={styles.div}>
      <p className={styles.searchMent}>로그인 시 메인페이지</p>   
      <p>인증된 계좌번호</p>
    </div>
  );
};

export default MainPage;
