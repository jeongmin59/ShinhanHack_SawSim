import React, { useState } from 'react';
import styles from "./Plan.module.css";
import Calendar from '../components/plan/Calendar';
import Header from "../components/common/Header"

const Plan = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  // const [startDate, endDate] = useState([null, null]);

  const handleConfirmClick = () => {
    const [startDate, endDate] = dateRange;

    if (!startDate && !endDate) {
      alert('일정을 등록하려면 시작 날짜와 종료 날짜를 선택하세요.');
      console.log('둘 다 null')
    } else if (!startDate || !endDate) {
      alert('시작 날짜와 종료 날짜 중 하나가 누락되었습니다.');
      console.log('누락 팝업')
    } else {
      setIsConfirmed(true);
      console.log('제발')
    }

    console.log('startDate:', startDate);
    console.log('endDate:', endDate);
  };
  
  console.log('dateRange:', dateRange); // dateRange 출력
  console.log('setDateRange:', setDateRange); // setDateRange 출력
  
  return (
    <div>
      <Header/>
      <p>여행 일정</p>
      <div className={styles.divContainer}>
        <Calendar dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      <button onClick={handleConfirmClick}>확인</button>

      {/* 확인이 완료되면 메시지를 표시할 수 있습니다. */}
      {isConfirmed && <p>일정이 등록되었습니다.</p>}

    </div>
  )
}

export default Plan;