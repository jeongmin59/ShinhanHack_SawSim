import {React, useState, useEffect} from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./BalanceSchedule.module.css";
import axios from "axios";
import { Button, Skeleton } from 'antd';
import shinhan from './shinhan.png'
import { CalendarOutlined, QuestionCircleOutlined } from '@ant-design/icons';

  // 7. 0이면(올바르면) 계좌 등록 되고 userNumber 받음
  // 8. 이거 메인페이지 넘어가면서 data로 갖고옴
  // 여기서부턴 메인페이지(여행 시작 전) 넘어가서
  // 9. 메인페이지에서 userNumber 이용해 계좌 조회
  // 10. 계좌번호로 잔액 조회 (신한 api)
  // ----------------------------------------api오면 할 것
  // 11. 여행 일정 api 조회 (규렬), 일정 있으면 예산 상세보기 및 시작하기 화면 ()
  // 12. 일정 없다면? 여행 시작하기 버튼 없애고 여행 일정 칸에 
  // '아직 일정이 없습니다. 일정을 등록하고 여행을 시작해보세요!' + 바로가기 버튼(toPlan)

const BalanceSchedule = () => {
  // const location = useLocation()
  // const data = location.state?.data // userNumber
  const data = localStorage.getItem('userNumber');
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [balance, setBalance] = useState('')
  const [plan, setPlan] = useState('')

  // 잔액 콤마 표시
  function formatBalance(balance) {
    return balance.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  // 계좌번호 형태으로 변환
  function formatAccountNumber(accountNumber) {
    const str = String(accountNumber);
    return str.substring(0, 3) + '-' + str.substring(3, 6) + '-' + str.substring(6, 12);
}

  // 9. data에 저장된 userName 이용해 계좌 조회 > accountNumber 나옴
  const checkAccount = async () => {
    try {
      const response = await axios.get("/api2/auth/accounts", { headers: { "User-Number": data } });
      console.log(response.data)
      console.log(response.data.dataBody.accountNumber)
      setAccount(response.data.dataBody.accountNumber)
      console.log(response.data.dataBody.name)
      setName(response.data.dataBody.name)
    } catch (error) {
      console.error(error);
    }
  }
  
  // 10. 계좌번호로 잔액 조회 (신한 api)
  const checkBalance = async () => {
    try {
      const requestData = {
        dataHeader: {
          apikey: "2023_Shinhan_SSAFY_Hackathon",
        },
        dataBody: {
          출금계좌번호: account,
        },
      };
      const response = await axios.post("/api1/v1/account/balance/detail", requestData);
      console.log(response.data)
      console.log(response.data.dataBody.지불가능잔액)
      const numericBalance = parseInt(response.data.dataBody.지불가능잔액, 10);
      setBalance(numericBalance)
    } catch (error) {
      console.error(error);
    }
  }
 
  // 11. 등록된 여행 일정 조회 (백 api)
  const checkPlan = async () => {
    try {
      const response = await axios.get("/api2/plan", { headers: { "User-Number": data } });
      console.log(response.data)
      setPlan(response.data.dataBody)
      console.log('플랜',plan)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkAccount();
    console.log(localStorage.getItem('userNumber'))
    console.log('로컬', data)
    if (account) {
      checkBalance();
    }
    checkPlan()
 }, [account]); // account 상태 업데이트 될때마다 재실행

  return (
    <div className={styles.div}>
      <div className={styles.balanceDiv}>
        <div className={styles.logoNAccount}>
          <img src={shinhan} alt='shinhan' className={styles.logo}/>
          <div className={styles.yejukNAccount}>
            <p className={styles.yejuk}>예적금</p>
            {/* <p className={styles.account}>{formatAccountNumber(String(account))}</p> */}
            <p className={styles.account}>{account ? formatAccountNumber(account) : 
            <Skeleton.Input style={{borderRadius:'2rem', width: 150 }} active size="small" />}</p>
          </div>
        </div>
        <p className={styles.balance}>
          {balance ? `${formatBalance(balance)}원` :
          <Skeleton.Input style={{marginTop: '-1rem', borderRadius:'2rem', width: 80 }} active size="large" />}</p>
        
        {plan.length === 0 ? (
          <>
            <Link to='/plan'>
            <Button 
              size="large" 
              style={{ height: '3rem', backgroundColor:'#316FDF', fontFamily:"preRg", width:'80vw'}}
              className={styles.startTrip}
              type="primary">여행 등록하러 GO</Button></Link>
          </>
        ) : (
          <>
            <Link to='/budget'>
            <Button 
              size="large" 
              style={{ height: '3rem', backgroundColor:'#316FDF', fontFamily:"preRg", width:'80vw'}}
              className={styles.startTrip}
              type="primary">여행 시작하기</Button></Link>
          </>
        )}

      </div>
      <div className={styles.scheduleNIcon}>
        <p className={styles.scheduleTitle}>{name}님의 여행 일정</p>
        <CalendarOutlined style={{ fontSize:'1.5rem', marginLeft: '0.5rem', paddingTop:'2.9rem'}} />
      </div>
      

      <div className={styles.scheduleDiv}>
        {plan.length === 0 ? (
          <>
          <p className={styles.noSchedule1}>등록된 여행 일정이 없습니다</p>
          <p className={styles.noSchedule2}>등록하기를 눌러 일정을 등록해주세요</p>
          </>
        ) : (
          <>
          <p className={styles.schedule}>{plan.startDate}-{plan.endDate}</p>
          <Link to='/plan'>
          <Button 
            size="medium" 
            style={{ 
              border:'1px solid', 
              color: 'black',
              backgroundColor: '#FFFFFF',
              borderColor:'grey', 
              fontWeight: '900', 
              fontFamily:"preBd",
              paddingTop: '0.3rem'}}
              className={styles.startTrip}
            >예산 상세보기</Button></Link>
          </>
        )}     
        
      </div>



    </div>
  );
};

export default BalanceSchedule;
