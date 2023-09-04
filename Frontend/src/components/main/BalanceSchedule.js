import {React, useState, useEffect} from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./BalanceSchedule.module.css";
import axios from "axios";
import { Button, Tooltip } from 'antd';
import shinhan from './shinhan.png'
import { CalendarOutlined, QuestionCircleOutlined } from '@ant-design/icons';

  // 7. 0이면(올바르면) 계좌 등록 되고 userNumber 받음
  // 8. 이거 메인페이지 넘어가면서 data로 갖고옴
  // 여기서부턴 메인페이지(여행 시작 전) 넘어가서
  // 9. 메인페이지에서 userNumber 이용해 계좌 조회
  // 10. 계좌번호로 잔액 조회 (신한 api)

const BalanceSchedule = () => {
  const location = useLocation()
  const data = location.state?.data // userNumber
  // const [userNum, setUserNum] = useState(data || "") 이미 data에 저장돼서 굳이..?
  const [account, setAccount] = useState('')

  // 9. data에 저장된 userName 이용해 계좌 조회 > accountNumber 나옴
  const checkAccount = async () => {
    try {
      const requestData = {
        dataHeader: {
          "User-Number": data,
        },
      };
      const response = await axios.get("/api2/v1/auth/accounts", requestData);
      console.log(response.data)
      console.log(response.data.dataBody.accountNumber)
      setAccount(response.data.dataBody.accountNumber)
    } catch (error) {
      console.error(error);
    }
  }
  
  // 10. 계좌번호로 잔액 조회 (신한 api)
  const  = async (randomNumber) => {
    try {
      const requestData = {
        dataHeader: {
          apikey: "2023_Shinhan_SSAFY_Hackathon",
        },
        dataBody: {
          입금은행코드: "088",
          입금계좌번호: account,
          입금통장메모: randomNumber
        },
      };
      const response = await axios.post("/api1/v1/auth/1transfer", requestData);
      console.log(response.data)
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkAccount();
  });

  return (
    <div className={styles.div}>
      <div className={styles.balanceDiv}>
        <div className={styles.logoNAccount}>
          <img src={shinhan} alt='shinhan' className={styles.logo}/>
          <div className={styles.yejukNAccount}>
            <p className={styles.yejuk}>예적금</p>
            <p className={styles.account}>1111-1111-111</p>
            {/* <p className={styles.account}>{account}</p> */}
          </div>
        </div>
        <p className={styles.balance}>100,000원</p>
        <Button 
          size="large" 
          style={{ height: '3rem', backgroundColor:'#0046FF', fontFamily:"preRg", width:'80vw'}}
          className={styles.startTrip}
          type="primary">여행 시작하기</Button>
      </div>
      <div className={styles.scheduleNIcon}>
        <p className={styles.scheduleTitle}>여행 일정</p>
        <CalendarOutlined style={{ fontSize:'1.5rem', marginLeft: '0.5rem', paddingTop:'2.9rem'}} />
        {/* <Tooltip style={{marginTop:'2.5rem'}} placement="right" title='일별 예산을 입력해보세요'>
          <QuestionCircleOutlined style={{ fontSize:'1.5rem', marginLeft: '0.3rem', paddingTop:'2.6rem'}} />
        </Tooltip> */}
      </div>
      <div className={styles.scheduleDiv}>     
        <p className={styles.schedule}>2023.08.25 - 2023.08.27</p>
        <Button 
          size="medium" 
          style={{ textAlign:'center', backgroundColor:'#0046FF', fontFamily:"lineRg", paddingTop:'0.3rem'}}
          className={styles.startTrip}
          type="primary">상세보기</Button>
      </div>
    </div>
  );
};

export default BalanceSchedule;