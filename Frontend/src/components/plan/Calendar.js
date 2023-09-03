import React from 'react';
import styles from './Calendar.module.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
// import { AiFillCalendar } from 'react-icons/ai'  // react-icon 라이브러리 (달력)
import { BsDash } from 'react-icons/bs';


const Calendar = ({ dateRange, setDateRange }) => {
  // const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  console.log('startDate:', startDate);
  console.log('endDate:', endDate);
  
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
        {/* <AiFillCalendar className={styles.CalendarIcon} /> */}
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
        {/* <AiFillCalendar className={styles.CalendarIcon} /> */}
      </div>
    </div>
  );
}

export default Calendar;