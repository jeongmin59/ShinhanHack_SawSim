import React from 'react';
import Header from "../components/common/Header";
import SelectedDate from '../components/plan/SelectedDate';
import DateList from '../components/plan/DateList';
import { Link } from 'react-router-dom';
import { Button, message } from 'antd';

const PlanDetail = () => {
  const success = () => {
    message.success('예산이 저장되었습니다.');
  }

  return (
    <div>
     <div>
      <Header/>
      <SelectedDate />
      <DateList />
      <Link
        to="/main"
      >
      <Button 
        style={{margin:"1.5rem 0", height: '3rem', width: '90%', backgroundColor:'#316FDF', fontFamily:"preRg"}} 
        size="large" 
        type="primary">확인</Button>
      </Link>      
      </div>
    </div>
  );
};

export default PlanDetail;