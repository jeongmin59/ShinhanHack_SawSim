import React, { useState, useEffect } from 'react';
import styles from './SelectedDate.module.css';
import DateList from './DateList';

const SelectedDate = () => {
  // 로컬 스토리지에서 일정 데이터 가져오기
  const getSavedSchedule = () => {
    const savedSchedule = localStorage.getItem('selectedDate');
    return savedSchedule ? JSON.parse(savedSchedule) : [];
  };

  // ISO 8601 형식의 날짜를 원하는 형식으로 포맷팅하는 함수
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const formattedDate = date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//     });
//     return formattedDate;
//   };

  const [selectedDates, setSelectedDates] = useState([]);

  // 컴포넌트가 처음 마운트될 때 일정 데이터를 불러옴
  useEffect(() => {
    const savedSchedule = getSavedSchedule();
    setSelectedDates(savedSchedule);
  }, []);

  // 선택한 날짜 범위를 연속된 날짜로 변환하는 함수
  const generateDateRange = (startDate, endDate) => {
    const dateRange = [];
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      dateRange.push(currentDate.toISOString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateRange;
  };

  // 선택한 날짜 범위를 연속된 날짜 배열로 변환
  const selectedDateRange = generateDateRange(selectedDates[0], selectedDates[selectedDates.length - 1]);

  return (
    <div>
      <p>선택된 날짜</p>
      <div className={styles.calendarDiv}>
        {selectedDates.map((item, index) => (
          <div key={index}>{getSavedSchedule(item)}</div>
        ))}
      </div>
      <DateList dates={selectedDateRange} />
    </div>
  );
}

export default SelectedDate;
