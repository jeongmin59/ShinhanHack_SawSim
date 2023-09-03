import React, { useState } from 'react';
import styles from './Calendar.module.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";

const Calendar = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      className={styles.datepicker}  // css 적용을 위함
      locale={ko}   // 한국어 적용
      dateFormat='yyyy-MM-dd'   // 날짜 형태
      
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      withPortal
    />
  );
}

export default Calendar;