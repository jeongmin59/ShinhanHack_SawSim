import {React, useState, useEffect} from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./Report.module.css";
import axios from "axios";
import { Button, Tooltip } from 'antd';

const Report = () => {
  const data = useLocation().state?.userNumber;
  const [day, setDay] = useState("")
  const [totalBudget, setTotalBudget] = useState("")
  const [amount, setAmount] = useState("")
  const [popular, setPopular] = useState([]);


  // 오늘 날짜
  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }

  // 일자별 여행비 분석
  const analyzeBudget = async () => {
    try {
      const requestData = {
        dataHeader: {
          "User-Number": data,
        },
        dataBody: { 
          "date" : getFormattedDate(),
        }
      };
      const response = await axios.get("/api2/v1//transactions/analyze", requestData);
      console.log(response.data)
      console.log(response.data.dataBody.day) // 여행 몇일차
      setDay()
      console.log(response.data.dataBody.totalBudget) // 전체에서 사용 비율
      setTotalBudget()
      console.log(response.data.dataBody.amount) // 사용한 총액
      setAmount()
      console.log(response.data.dataBody.category) // 사용한 카테고리별 비율
    } catch (error) {
      console.error(error);
    }
  }
  
//   {
//     "dataHeader": {
//         "successCode": "0",
//         "resultCode": "",
//         "resultMessage": ""
//     },
//     "dataBody": {
//         "day" : "3",
//         "totalBudget":"75",
//         "amount":"340120",
//         "category" : {
//             "식비" : "12",
//             "교통비" : "8",
//             "기념품" : "5"
//          }
//     }
// }

  useEffect(() => {
    console.log(data)
    analyzeBudget()
    getFormattedDate()
  }, [data]);

  return (
  <div>
    <p className={styles.tripCalendarTitle}>예산 실시간 분석</p><br/>
    <div className={styles.calendarDiv}>
      {/* <p className={styles.ment}>여행 3일차</p>
      <p className={styles.ment}>오늘 예산의 75%인 12,000원을 사용하셨네요!</p> */}
      <Link to="/cash"><Button style={{fontFamily:"preRg", marginRight:'1rem'}} type="primary">현금 기록하기</Button></Link>
      <Link to="/transaction"><Button style={{fontFamily:"preRg"}} type="primary">상세보기</Button></Link>
    </div>
  </div>
  );
};

export default Report;
