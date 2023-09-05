import React from 'react';
import styles from './DateList.module.css';

const DateList = ({ dates }) => {

  return (
    <div>
      <p className={styles.ListDiv}>선택된 날짜 목록</p>
      <div>
        {dates.map((date, index) => (
          <div key={index} className={styles.dateItem}>{date}
        <div>아아</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DateList;