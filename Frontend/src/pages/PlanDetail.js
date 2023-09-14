import React from 'react';
import Header from "../components/common/Header";
import SelectedDate from '../components/plan/SelectedDate';
import DateList from '../components/plan/DateList';
import { Link } from 'react-router-dom';
import { Button, message } from 'antd';

const PlanDetail = () => {
  // const [messageApi, contextHolder] = message.useMessage();
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
          onClick={success}
          size="small"
          style={{
            height: '2rem',
            marginTop: '3rem',
            width: '4rem',
            backgroundColor: '#316FDF',
            fontFamily: "preRg",
          }}
          type="primary"
        >
          완료
        </Button>
      </Link>      
      </div>
    </div>
  );
};

export default PlanDetail;