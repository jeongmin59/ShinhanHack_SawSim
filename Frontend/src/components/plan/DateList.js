import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from './DateList.module.css';
import { Button } from 'antd';
import axios from 'axios';

const DateList = () => {
  const [dates, setdates] = useState([]);

  const getdates = async () => {
    try {
      const response = await axios.get("/plan");
      // console.log(response.data)
      // console.log(response.data.data.resultCount)
      // console.log(response.data.data.results);
      if (response.data && response.data.data.results && response.data.data.results.length > 0) {
        setdates(response.data.data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getdates();
  }, []);



  return (
    <div>
      <p className={styles.ListDiv}>선택된 날짜 목록</p>
      <div>
        {dates.map((date, index) => (
          <div key={index} className={styles.dateItem}>{date}
          <Link to={{
            pathname: '/planbudget',
          }}>
          <Button 
            size="small" 
            style={{ height: '2rem', backgroundColor:'#0046FF', fontFamily:"preRg"}}
            // className={styles.startTrip}
            type="primary">예산 추가하기</Button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DateList;