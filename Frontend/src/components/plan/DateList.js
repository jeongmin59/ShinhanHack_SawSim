import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './DateList.module.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import '../../pages/Transaction.css'

function DateList() {
  const [lastPlan, setLastPlan] = useState(null);
  const [latestPlanId, setLatestPlanId] = useState(null); // 최신 planId 상태 추가
  const data = localStorage.getItem('userNumber');

  const getDates = async () => {
    try {
      const response = await axios.get("/api2/plan", 
        { headers: { "User-Number" : data } });
      const dataBody = response.data.dataBody;

      if (dataBody.length > 0) {
        const lastPlan = dataBody[dataBody.length - 1];
        setLastPlan(lastPlan);

        // 가장 최신의 planId를 가져와 상태에 설정
        setLatestPlanId(lastPlan.planId);

        console.log(dataBody);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDates();
  }, []);

  console.log(latestPlanId)

  const renderDateRange = (startDate, endDate) => {
    const dateArray = [];
    const currentDate = new Date(startDate);
  
    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dateArray.map((date, index) => {
      const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
  
      return (
        <div key={index}>
          <p className={styles.dateText}>
            {index + 1}일차 [{date.getFullYear()}.
            {date.getMonth() + 1 < 10 ? '0' : ''}{date.getMonth() + 1}.
            {date.getDate() < 10 ? '0' : ''}{date.getDate()}]
          </p>
          <div className={styles.dateItem}>
            <Link to={{
              pathname: `${lastPlan.planId}`,
              state: {
                formattedDate: formattedDate,
                latestPlanId: lastPlan.planId, // 최신 planId를 넘겨줍니다.
              }
            }}>
              <Button
                size="small"
                style={{ height: '2rem', backgroundColor: '#316FDF', fontFamily: "preRg" }}
                type="primary"
              >
                예산 추가하기
              </Button>
            </Link>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      {lastPlan ? (
        <div>
          {renderDateRange(lastPlan.startDate, lastPlan.endDate)}
        </div>
      ) : (
        <p>선택된 일정이 없습니다.</p>
      )}
    </div>
  );
}

export default DateList;
