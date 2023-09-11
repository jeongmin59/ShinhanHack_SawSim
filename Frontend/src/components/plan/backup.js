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

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './SelectedDate.module.css';
// import { useNavigate } from 'react-router-dom';

// function SelectedDate() {
//   const [lastPlan, setLastPlan] = useState(null);
//   const data = localStorage.getItem('userNumber');
//   const navigate = useNavigate();

//   const getDate = async () => {
//     try {
//       const response = await axios.get("/api2/plan", 
//         { headers: { "User-Number" : data } });
//       const dataBody = response.data.dataBody;

//       if (dataBody.length > 0) {
//         const lastPlan = dataBody[dataBody.length - 1];
//         setLastPlan(lastPlan);

//         const planId = lastPlan.plan_id;
//         if (planId) {
//           // 리디렉션 코드를 여기서 사용
//           navigate(`/plan/${planId}`);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   useEffect(() => {
//     getDate();
//   }, [data]);

//   useEffect(() => {
//     // beforeunload 이벤트 핸들러 등록
//     const handleBeforeUnload = (e) => {
//       if (lastPlan) {
//         const planId = lastPlan.plan_id;
//         if (planId) {
//           // beforeunload 이벤트에서도 리디렉션 코드를 사용
//           navigate(`/plan/${planId}`);
//         }
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       // 컴포넌트가 언마운트될 때 이벤트 핸들러를 제거
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, [lastPlan, navigate]);

//   return (
//     <div>
//       <h3>여행 일정</h3>
//       {lastPlan ? (
//         <div className={styles.dateItem}>
//           <p>여행 시작 일자: {lastPlan.startDate}</p>
//           <p>여행 종료 일자: {lastPlan.endDate}</p>
//         </div>
//       ) : (
//         <p>일정을 선택해주세요.</p>
//       )}
//     </div>
//   );
// }

// export default SelectedDate;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './DateList.module.css';
// import { Button } from 'antd';
// import { Link } from 'react-router-dom';
// import '../../pages/Transaction.css';
// // import { useLocation } from 'react-router-dom';

// function DateList() {
//   const [lastPlan, setLastPlan] = useState(null);
//   const [latestPlanId, setLatestPlanId] = useState(null); // 최신 planId 상태 추가
//   const data = localStorage.getItem('userNumber');

//   useEffect(() => {
//     const getDates = async () => {
//       try {
//         const response = await axios.get("/api2/plan", 
//           { headers: { "User-Number" : data } });
//         const dataBody = response.data.dataBody;

//         if (dataBody.length > 0) {
//           const lastPlan = dataBody[dataBody.length - 1];
//           setLastPlan(lastPlan);

//           // 가장 최신의 planId를 가져와 상태에 설정
//           setLatestPlanId(lastPlan.planId);
          
//           console.log("latestPlanId:", lastPlan.planId);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     getDates();
//   }, [data]);

//   const renderDateRange = (startDate, endDate) => {
//     const dateArray = [];
//     const currentDate = new Date(startDate);

//     while (currentDate <= new Date(endDate)) {
//       dateArray.push(new Date(currentDate));
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     return dateArray.map((date, index) => {
//       const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
//       console.log("formattedDate:", formattedDate);

//       return (
//         <div key={index}>
//           <p className={styles.dateText}>
//             {index + 1}일차 [{date.getFullYear()}.
//             {date.getMonth() + 1 < 10 ? '0' : ''}{date.getMonth() + 1}.
//             {date.getDate() < 10 ? '0' : ''}{date.getDate()}]
//           </p>
//           <div className={styles.dateItem}>
//             <Link
//               to={{
//                 pathname: `/budget/${latestPlanId}`,
//                 state: {
//                   formattedDate: formattedDate,
//                   latestPlanId: latestPlanId,
//                 }
//               }}
//             >
//               <Button
//                 size="small"
//                 style={{ height: '2rem', backgroundColor: '#316FDF', fontFamily: "preRg" }}
//                 type="primary"
//               >
//                 예산 추가하기
//               </Button>
//             </Link>
//           </div>
//         </div>
//       );
//     });
//   }

//   return (
//     <div>
//       {lastPlan ? (
//         <div>
//           {renderDateRange(lastPlan.startDate, lastPlan.endDate)}
//         </div>
//       ) : (
//         <p>선택된 일정이 없습니다.</p>
//       )}
//     </div>
//   );
// }

// export default DateList;
