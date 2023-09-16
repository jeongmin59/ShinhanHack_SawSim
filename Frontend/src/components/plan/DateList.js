import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './DateList.module.css';
import { Button, Badge, Divider, Space } from 'antd';
import { Link } from 'react-router-dom';
import '../../pages/Transaction.css';

function DateList() {
  const [planId, setPlanId] = useState(null);
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const data = localStorage.getItem('userNumber');
  const [budgetData, setBudgetData] = useState([]);


  const formatDate = (date) => {
    return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;
  };

  useEffect(() => {
    const getDates = async () => {
      try {
        const response = await axios.get("https://sawsim.site/api/plan", {
          headers: { "User-Number": data }
        });
        const dataBody = response.data.dataBody;
        setPlanId(dataBody.planId);
        setEndDate(formatDate(dataBody.endDate)); // Format end date
        setStartDate(formatDate(dataBody.startDate)); // Format start date
      } catch (error) {
        console.error(error);
      }
    }

    getDates();
  }, [data]);

  const getBudgetData = async () => {
    try {
      const response = await axios.get(`https://sawsim.site/api/budget/${planId}`);
      const dataBody = response.data.dataBody;
      setBudgetData(dataBody);
      console.log(dataBody);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (planId) {
      getBudgetData();
    }
  }, [planId]);

  const renderDateRange = (startDate, endDate) => {
    const dateArray = [];
    const currentDate = new Date(startDate);
    const endDateObj = new Date(endDate);

    while (currentDate <= endDateObj) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const categoryColors = {
      음식점: 'red',
      '교통,수송': 'yellow',
      '스포츠,레저': 'lime',
      관광지: 'cyan',
      숙박: 'violet',
      기타: 'gray',
    };

    return dateArray.map((date, index) => {
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      console.log("formattedDate:", formattedDate);

      // 현재 날짜에 해당하는 budgetData 필터링
      const filteredBudgetData = budgetData.filter(item => item.travelDate === formattedDate);

      return (
        <div key={index}>
          <p className={styles.dateText}>
            {index + 1}일차 [{formattedDate}]
          </p>
          <div className={styles.dateItem}>
            <table className={styles.centeredTable}>
              <thead>
                <tr className={styles.lineTitle}>
                  <th className={styles.elementTitle}>카테고리</th>
                  <th className={styles.elementTitle}>예산</th>
                  <th className={styles.elementTitle}></th>
                </tr>
              </thead>
              <tbody>
                {filteredBudgetData.map((item) => (
                  <tr className={styles.lineContent} key={item.budgetId}>
                    <td className={styles.elementContent}>
                      <Badge
                        color={categoryColors[item.category]}
                        text={item.category}
                        dot
                        style={{
                          // width: '6rem',
                          height: '2rem',
                          fontSize: '1.6rem',
                          fontFamily: 'preRg',
                          // size: '7rem'
                        }}
                      />
                    </td>
                    <td className={styles.elementContent}>{item.amount.toLocaleString()}</td>
                    <td className={styles.elementContent}>
                      <Link
                        to={`/budget/${planId}/update`}
                        state={{
                          formattedDate: formattedDate,
                          planId: planId,
                          category: item.category,
                          amount: item.amount
                        }}
                      >
                        <Button
                          style={{
                            height: '2rem',
                            width: '50%',
                            backgroundColor: 'white',
                            fontFamily: "preRg",
                            color: '#316FDF',
                            border: 'none',
                            fontSize: '1rem',
                            textAlign: 'center',
                            paddingRight: '1.2rem'
                          }}
                          size="middle"
                        >
                          수정
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link
              to={`/budget/${planId}`}
              state={{
                formattedDate: formattedDate,
                planId: planId,
              }}
            >
              <Button
                size="small"
                style={{
                  height: '2rem',
                  marginTop: '1rem',
                  backgroundColor: '#316FDF',
                  fontFamily: "preRg",
                }}
                type="primary"
              >
                예산 추가하기
              </Button>
            </Link>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      {planId ? (
        <div>
          {renderDateRange(startDate, endDate)}
        </div>
      ) : (
        <p>선택된 일정이 없습니다.</p>
      )}
    </div>
  );
}

export default DateList;
