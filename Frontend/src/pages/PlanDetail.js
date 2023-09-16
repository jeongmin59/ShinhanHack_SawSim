import React from 'react';
import Header from "../components/common/Header";
import SelectedDate from '../components/plan/SelectedDate';
import DateList from '../components/plan/DateList';
import { Link } from 'react-router-dom';
import { Button, message } from 'antd';
import styles from './PlanDetail.module.css'


const PlanDetail = () => {
  const success = () => {
    message.success('예산이 저장되었습니다.');
  }

  return (
    <div>
     <div>
      <Header/>
      <SelectedDate />
      <div className={styles.container}>
      <p className={styles.retryMent}>일정을 다시 선택하려면?</p>
      <Link to="/plan">
        <Button
          style={{height: '2rem', 
          width: '100%', 
          backgroundColor:'white', 
          // marginTop: '2rem',
          // fontFamily:"preRg",
          color:'#316FDF', border:'1px solid #316FDF', 
          fontFamily:'preBd', fontSize: '1rem'
          }} 
          size="middle"
        >일정 재선택</Button>
      </Link>
      </div>
      <DateList/>
      <Link
        to="/main"
      >
      <Button 
        style={{margin:"1.5rem 0", 
          height: '3rem', width: '90%', 
          backgroundColor:'#316FDF', 
          fontFamily:"preRg"}} 
        size="large" 
        type="primary">완료</Button>
      </Link>      
      </div>
    </div>
  );
};

export default PlanDetail;