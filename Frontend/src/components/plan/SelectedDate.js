import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SelectedDate.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import sad from "../../assets/sad.png"

function SelectedDate() {
  const [planId, setPlanId] = useState(null);
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const data = localStorage.getItem('userNumber');
  const location = useLocation();

  const getDate = async () => {
    try {
      const response = await axios.get("https://sawsim.site/api/plan", {
        headers: { "User-Number": data }
      });
      console.log('성공', response.data)
      const dataBody = response.data.dataBody;
      if (dataBody !== null) {
        setPlanId(dataBody.planId)
        setEndDate(dataBody.endDate)
        setStartDate(dataBody.startDate)
      } else {
        setPlanId(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDate();
  }, []);

  const isButtonVisible = location.pathname !== `/plan/${planId}`;

  return (
    <div>
      <p className={styles.planDateTitle}>여행 일정</p>
      {planId !== null ? (
        <div className={styles.dateItem}>
          <p>여행 시작 일: {startDate}</p>
          <p>여행 종료 일: {endDate}</p>
          <div>
            {isButtonVisible && (
              <Link to={`/plan/${planId}`}>
                <Button
                  size="large"
                  style={{
                    height: '2.5rem',
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem',
                    backgroundColor: '#316FDF',
                    fontFamily: 'preRg',
                    fontSize: '1rem'
                  }}
                  type="primary"
                >
                  날짜별로 예산 추가하기
                </Button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.noPort}>
          <img className={styles.sad} src={sad} alt="sad"/>
          <p className={styles.sadMent}>일정을 선택해주세요.</p>
        </div>
      )}
    </div>
  );
}

export default SelectedDate;
