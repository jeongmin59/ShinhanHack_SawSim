import React, { useState, useEffect } from 'react';
import styles from './SelectedDate.module.css';
import DateList from './DateList';
import axios from 'axios';

const SelectedDate = () => {
  const [selectedDates, setSelectedDates] = useState({ startDate: null, endDate: null });

  // 선택한 날짜 범위를 백엔드에서 가져오는 함수
  const fetchSelectedDatesFromBackend = async () => {
    try {
      // 백엔드 API 호출
      const response = await axios.get('/api2/plan'); // API 엔드포인트를 실제 엔드포인트로 변경

      // API 응답에서 선택한 날짜 데이터 추출
      const { startDate, endDate } = response.data;

      // 상태 업데이트
      setSelectedDates({ startDate, endDate });
    } catch (error) {
      console.error('백엔드 API 호출 에러:', error);
    }
  };

  // 컴포넌트가 처음 마운트될 때 백엔드에서 날짜 데이터를 가져옴
  useEffect(() => {
    fetchSelectedDatesFromBackend();
  }, []);

  // 컴포넌트가 처음 마운트될 때 일정 데이터를 불러옴
  // useEffect(() => {
  //   const savedSchedule = getSavedSchedule();
  //   setSelectedDates(savedSchedule);
  // }, []);

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
    {selectedDates.startDate && selectedDates.endDate ? (
      <div className={styles.calendarDiv}>
        <div>시작 날짜: {selectedDates.startDate}</div>
        <div>종료 날짜: {selectedDates.endDate}</div>
      </div>
    ) : (
      <div>날짜를 선택하지 않았습니다.</div>
    )}
    <DateList dates={selectedDateRange} />
  </div>
  );
}

export default SelectedDate;



// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import styles from './DateList.module.css';
// import { Button } from 'antd';
// import axios from 'axios';

// const DateList = () => {
//   const [lastPlan, setLastPlan] = useState(null);

//   const getDate = async () => {
//     try {
//       const headers = {"User-Number": "4d03f54d-9b32-4d88-8705-23f6409f4502"}

//       const response = await axios.get("/api2/plan", { headers: headers });
//       const dataBody = response.data.dataBody;

//       if (dataBody.length > 0) {
//         const lastPlan = dataBody[dataBody.length - 1];
//         setLastPlan(lastPlan);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   useEffect(() => {
//     getDate();
//   }, []);

//   return (
//     <div>
//       <p className={styles.ListDiv}>선택된 날짜 목록</p>
//       <div>
//         {lastPlan ? (
//           lastPlan.map((date, index) => (
//             <div key={index} className={styles.dateItem}>
//               <p>여행 시작 일자: {date.startDate}</p>
//               <p>여행 종료 일자: {date.endDate}</p>
//               <Link to={{
//                 pathname: '/planbudget',
//               }}>
//                 <Button
//                   size="small"
//                   style={{ height: '2rem', backgroundColor: '#0046FF', fontFamily: "preRg" }}
//                   type="primary">예산 추가하기</Button>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p>로딩 중...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DateList;
