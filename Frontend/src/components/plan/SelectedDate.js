import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SelectedDate.module.css'

function SelectedDate() {
  const [lastPlan, setLastPlan] = useState(null);

  const getDate = async () => {
    try {
      const headers = {"User-Number": "4d03f54d-9b32-4d88-8705-23f6409f4502"}

      const response = await axios.get("/api2/plan", { headers: headers });
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
  }, []);

  return (
    <div>
      <h3>선택된 일정</h3>
      {lastPlan ? (
        <div className={styles.dateItem}>
          <p>여행 시작 일자: {lastPlan.startDate}</p>
          <p>여행 종료 일자: {lastPlan.endDate}</p>
        </div>
      ) : (
        <p>선택된 일정이 없습니다.</p>
      )}
    </div>
  );
}

export default SelectedDate;
