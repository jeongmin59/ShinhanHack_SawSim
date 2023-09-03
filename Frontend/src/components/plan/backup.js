import React, { useState } from 'react';
import styles from './Calendar.module.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
import { AiFillCalendar } from 'react-icons/ai'  // react-icon 라이브러리 (달력)
import { BsDash } from 'react-icons/bs';

const Calendar = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className={styles.DateBoxContainer}>
      <div className={styles.DateBox}>
        <DatePicker
          className={styles.StyledDatePicker}
          locale={ko}   // 한국어
          dateFormat="yyyy.MM.dd"
          selected={startDate}
          closeOnScroll={true}
          onChange={(date) => setDateRange([date, endDate])}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <AiFillCalendar className={styles.CalendarIcon} />
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
        />
        <AiFillCalendar className={styles.CalendarIcon} />
      </div>
    </div>
  );
}

export default Calendar;

// import React, { useState } from 'react';
// import styles from "./Plan.module.css";
// import Calendar from '../components/plan/Calendar';
// import Header from "../components/common/Header"

// const Plan = () => {
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [dateRange, setDateRange] = useState([null, null]);
//   // const [startDate, endDate] = useState([null, null]);

//   const handleConfirmClick = () => {
//     const [startDate, endDate] = dateRange;

//     if (!startDate && !endDate) {
//       alert('일정을 등록하려면 시작 날짜와 종료 날짜를 선택하세요.');
//       console.log('둘 다 null')
//     } else if (!startDate || !endDate) {
//       alert('시작 날짜와 종료 날짜 중 하나가 누락되었습니다.');
//       console.log('누락 팝업')
//     } else {
//       setIsConfirmed(true);
//       console.log('제발')
//     }

//     console.log('startDate:', startDate);
//     console.log('endDate:', endDate);
//   };
  
//   console.log('dateRange:', dateRange); // dateRange 출력
//   console.log('setDateRange:', setDateRange); // setDateRange 출력
  
//   return (
//     <div>
//       <Header/>
//       <p>여행 일정</p>
//       <div className={styles.divContainer}>
//         <Calendar dateRange={dateRange} setDateRange={setDateRange} />
//       </div>
//       <button onClick={handleConfirmClick}>확인</button>

//       {/* 확인 완료 */}
//       {isConfirmed && <p>일정이 등록되었습니다.</p>}

//     </div>
//   )
// }

// export default Plan;

// import React from 'react';
// import styles from './Calendar.module.css';
// import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css';
// import { ko } from "date-fns/esm/locale";
// // import { AiFillCalendar } from 'react-icons/ai'  // react-icon 라이브러리 (달력)
// import { BsDash } from 'react-icons/bs';


// const Calendar = ({ dateRange, setDateRange }) => {
//   // const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;

//   console.log('startDate:', startDate);
//   console.log('endDate:', endDate);
  
//   return (
//     <div className={styles.DateBoxContainer}>
//       <div className={styles.DateBox}>
//         <DatePicker
//           className={styles.StyledDatePicker}
//           locale={ko}   // 한국어
//           dateFormat="yyyy.MM.dd"
//           selected={startDate}
//           closeOnScroll={true}
//           onChange={(date) => setDateRange([date, endDate])}
//           selectsStart
//           startDate={startDate}
//           endDate={endDate}
//         />
//         {/* <AiFillCalendar className={styles.CalendarIcon} /> */}
//       </div>
//       <BsDash />
//       <div className={styles.DateBox}>
//         <DatePicker
//           className={styles.StyledDatePicker}
//           locale={ko}
//           dateFormat="yyyy.MM.dd"
//           selected={endDate}
//           closeOnScroll={true}
//           onChange={(date) => setDateRange([startDate, date])}
//           selectsEnd
//           startDate={startDate}
//           endDate={endDate}
//           minDate={startDate || null}
//         />
//         {/* <AiFillCalendar className={styles.CalendarIcon} /> */}
//       </div>
//     </div>
//   );
// }

// export default Calendar;

// 아아아ㅏㅏ
// import React, { useEffect, useState, useRef } from 'react';

// const DailyBudget = ({ dateRange }) => {
//   const [localDateRange, setLocalDateRange] = useState(dateRange || []);
//   const prevDateRangeRef = useRef();

//   // dateRange가 변경되면 localDateRange도 업데이트
//   useEffect(() => {
//     prevDateRangeRef.current = dateRange;
//   });

//   const prevDateRange = prevDateRangeRef.current;

//   useEffect(() => {
//     if (JSON.stringify(prevDateRange) !== JSON.stringify(dateRange)) {
//       console.log('DailyBudget - dateRange:', localDateRange);
//       setLocalDateRange(dateRange || []);
//     }
//   }, [dateRange]);

//   const [startDate, endDate] = localDateRange;

//   return (
//     <div>
//       <h2>날짜 범위:</h2>
//       <p>시작 날짜: {startDate ? startDate.toString() : '데이터 없음'}</p>
//       <p>종료 날짜: {endDate ? endDate.toString() : '데이터 없음'}</p>
//     </div>
//   );
// }

// export default DailyBudget;
