import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SelectedDate.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';

function SelectedDate() {
  const [lastPlan, setLastPlan] = useState(null);
  const data = localStorage.getItem('userNumber');
  const location = useLocation();

  const getDate = async () => {
    try {
      const response = await axios.get("/api2/plan", 
        { headers: { "User-Number" : data } });
      const dataBody = response.data.dataBody;

      if (dataBody.length > 0) {
        const lastPlan = dataBody[dataBody.length - 1];
        setLastPlan(lastPlan);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getDate();
  }, [data]);

  return (
    <div>
      <h3>여행 일정</h3>
      {lastPlan ? (
        <div className={styles.dateItem}>
          <p>여행 시작 일자: {lastPlan.startDate}</p>
          <p>여행 종료 일자: {lastPlan.endDate}</p>
          <div>
            <Link to={`/plan/${lastPlan.planId}`}>
              <Button
                size="small"
                style={{
                  height: '2rem',
                  marginTop: '1rem',
                  backgroundColor: '#316FDF',
                  fontFamily: "preRg"
                }}
                type="primary"
              >
                날짜별로 예산 추가하기
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <p>일정을 선택해주세요.</p>
      )}
    </div>
  );
}

export default SelectedDate;
