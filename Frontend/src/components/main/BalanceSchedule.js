import {React, useState} from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./BalanceSchedule.module.css";
import axios from "axios";
import { Button, Tooltip } from 'antd';
import shinhan from './shinhan.png'
import { CalendarOutlined, QuestionCircleOutlined } from '@ant-design/icons';



const BalanceSchedule = () => {
  return (
    <div className={styles.div}>
      <div className={styles.balanceDiv}>
        <div className={styles.logoNAccount}>
          <img src={shinhan} alt='shinhan' className={styles.logo}/>
          <div className={styles.yejukNAccount}>
            <p className={styles.yejuk}>예적금</p>
            <p className={styles.account}>1111-1111-111</p>
          </div>
        </div>
        <p className={styles.balance}>100,000원</p>
        <Button 
          size="large" 
          style={{ backgroundColor:'#0046FF', fontFamily:"lineRg", width:'80vw', paddingTop:'0.55rem'}}
          className={styles.startTrip}
          type="primary">여행 시작하기</Button>
      </div>
      <div className={styles.scheduleNIcon}>
        <p className={styles.scheduleTitle}>여행 일정</p>
        <CalendarOutlined style={{ fontSize:'1.5rem', marginLeft: '0.5rem', paddingTop:'2.5rem'}} />
        {/* <Tooltip style={{marginTop:'2.5rem'}} placement="right" title='일별 예산을 입력해보세요'>
          <QuestionCircleOutlined style={{ fontSize:'1.5rem', marginLeft: '0.3rem', paddingTop:'2.6rem'}} />
        </Tooltip> */}
      </div>
      <div className={styles.scheduleDiv}>     
        <p className={styles.schedule}>2023.08.25 - 2023.08.27</p>
        <Button 
          size="medium" 
          style={{ textAlign:'center', backgroundColor:'#0046FF', fontFamily:"lineRg", paddingTop:'0.3rem'}}
          className={styles.startTrip}
          type="primary">상세보기</Button>
      </div>
    </div>
  );
};

export default BalanceSchedule;
