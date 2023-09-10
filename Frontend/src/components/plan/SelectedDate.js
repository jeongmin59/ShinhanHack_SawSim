import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SelectedDate.module.css'

function SelectedDate() {
  const [lastPlan, setLastPlan] = useState(null);

  const getDate = async () => {
    try {
      const headers = {"User-Number": "44b78142-4320-4115-88f1-86bb562fbc0c"}

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
      <h3>여행 일정</h3>
      {lastPlan ? (
        <div className={styles.dateItem}>
          <p>여행 시작 일자: {lastPlan.startDate}</p>
          <p>여행 종료 일자: {lastPlan.endDate}</p>
        </div>
      ) : (
        <p>일정을 선택해주세요.</p>
      )}
    </div>
  );
}

export default SelectedDate;
