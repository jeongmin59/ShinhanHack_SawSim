import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './DateList.module.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import '../../pages/Transaction.css';

function DateList() {
  const [planId, setPlanId] = useState(null);
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');

  const data = localStorage.getItem('userNumber');
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    const getDates = async () => {
      try {
        const response = await axios.get("/api2/plan", {
          headers: { "User-Number": data }
        });
        const dataBody = response.data.dataBody;
        console.log(dataBody)
        setPlanId(dataBody.planId)
        setEndDate(dataBody.endDate)
        setStartDate(dataBody.startDate)
      } catch (error) {
        console.error(error);
      }
    }

    getDates();
  }, [data]);

  const getBudgetData = async () => {
    try {
      const response = await axios.get(`/api2/budget/${planId}`);
      const dataBody = response.data.dataBody;
      setBudgetData(dataBody);
      console.log(dataBody)
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
                <tr>
                  <th>카테고리</th>
                  <th>예산</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredBudgetData.map((item) => (
                  <tr key={item.budgetId}>
                    <td className={styles.centeredCell}>{item.category}</td>
                    <td className={styles.centeredCell}>{item.amount}</td>
                    <td>

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
                          size="small"
                          style={{
                            height: '2rem',
                            marginTop: '1rem',
                            backgroundColor: 'white',
                            color: 'black',
                            fontFamily: "preRg",
                          }}
                          type="primary"
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
