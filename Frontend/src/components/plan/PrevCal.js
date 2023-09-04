import React, { useState } from 'react';
import styles from "./Calendar.module.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
import { BsDash } from 'react-icons/bs';
import DailyBudget from './DailyBudget';

const CalendarComponent = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleConfirmClick = () => {
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
  console.log('dateRange:', dateRange);
  console.log('setDateRange:', setDateRange);

  return (
    <div>
      <div className={styles.divContainer}>
        <div className={styles.DateBoxContainer}>
          <div className={styles.DateBox}>
            <DatePicker
              className={styles.StyledDatePicker}
              locale={ko}
              dateFormat="yyyy.MM.dd"
              selected={startDate}
              closeOnScroll={true}
              onChange={(date) => setDateRange([date, endDate])}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <BsDash />
          <div className={styles.DateBox}>
            <DatePicker
              className={styles.StyledDatePicker}
              locale={ko}
              dateFormat="yyyy.MM.dd"
              selected={endDate}
              closeOnScroll={true}
              onChange={(date) => setDateRange([startDate, date])}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || null}
            />
          </div>
        </div>
      </div>
      <button onClick={handleConfirmClick}>확인</button>

      {/* 확인 완료 */}
      {isConfirmed && <p>일정이 등록되었습니다.</p>}
      <DailyBudget startDate={startDate} endDate={endDate} />
      {/* <DailyBudget dateRange={dateRange} /> */}
    </div>
  )
}

export default CalendarComponent;
