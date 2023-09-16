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
  // 11. 여행 일정 api 조회 (규렬), 일정 있으면 예산 상세보기 및 시작하기 화면 ()
  // 12. 일정 없다면? 여행 시작하기 버튼 없애고 여행 일정 칸에 
  // '아직 일정이 없습니다. 일정을 등록하고 여행을 시작해보세요!' + 바로가기 버튼(toPlan)
  // -------------------------------남은 할 일
  // 13. 여행 시작하기 버튼은 여행 시작 날짜가 됐을때 - 끝나는 날짜 사이에만 활성화
  // 14. 만약 오늘 날짜가 여행 끝나는 날짜를 넘어섰다? 즉 여행이 끝났다?
  // -> 여행 포트폴리오 버튼으로 변경 & 예산 상세보기 버튼은 '즐거운 여행 되셨나요?' 등의 문구로 변경
  // 1) 다른 여행 일정을 잡고싶다면? > 포트폴리오 페이지에 여행 끝마치기 하면서 기존 여행 일정 초기화?
  // 2) 여행 등록하러 GO는 그대로 두고 밑에 예산 상세보기를 포트폴리오 보기로 변경
  // ------------------------------- 여행 종료 분기
  // 15. 만약 조회되는 여행 일정이 있고, endDate가 오늘 날짜와 같다면
  // 16. 여행 시작하기 버튼 -> 여행 종료하기 버튼 (여행 종료 및 포폴 등록 api 쏘는 함수 등록)
  // 17. 만약 오늘날짜가 endDate를 지났다면(더 크다면)
  // 18. 자동으로 여행 종료 (api 호출 함수 실행)
  // 19. 일정 조회가 안되기때문에 여행 등록하러 GO로 바뀌어야 정상

const BalanceSchedule = () => {
  // const location = useLocation()
  // const data = location.state?.data // userNumber
  const data = localStorage.getItem('userNumber');
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [balance, setBalance] = useState('')
  const [plan, setPlan] = useState([])
  const [planId, setPlanId] = useState('')

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
      const response = await axios.get("https://sawsim.site/api/auth/accounts", { headers: { "User-Number": data } });
      console.log(response.data)
      console.log(response.data.dataBody.accountNumber)
      setAccount(response.data.dataBody.accountNumber)
      console.log(response.data.dataBody.name)
      setName(response.data.dataBody.name)
      sessionStorage.setItem('account', account)
      localStorage.setItem('userName', name);
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
      const response = await axios.post("https://sawsim.site/api/v1/account/balance/detail", requestData);
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
      const response = await axios.get("https://sawsim.site/api/plan", { headers: { "User-Number": data } });
      console.log(response.data)
      if (response.data.dataBody !== null) {
        console.log('왜 안찍힘?', response.data.dataBody)
        setPlan(response.data.dataBody)
        setPlanId(response.data.dataBody.planId)
        // console.log('플랜',plan)
      } else {
        console.log('등록된 일정이 없습니다')
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 15~ 오늘 날짜 겟
  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    
    return `${year}-${month}-${day}`;
  }

  // 18. 자동으로 여행 종료 (api 호출 함수 실행)
  const finishTrip = async () => {
    try {
      const response = await axios.get(`https://sawsim.site/api/portfolio/${planId}`, { headers: { "User-Number": data } });
      console.log('여행종료',response.data)
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  // 폭죽
  // function ConfettiComponent() {
  //   const count = 200;
  //   const defaults = {
  //     origin: { y: 0.7 }
  //   };
  
  //   function fire(particleRatio, opts) {
  //     confetti(Object.assign({}, defaults, opts, {
  //       particleCount: Math.floor(count * particleRatio)
  //     }));
  //   }
  
  //   // componentDidMount나 useEffect 등에서 호출할 수 있도록 원하는 시점에 fire 함수를 호출합니다.
  //   React.useEffect(() => {
  //     fire(0.25, {
  //       spread: 26,
  //       startVelocity: 55,
  //     });
  //     fire(0.2, {
  //       spread: 60,
  //     });
  //     fire(0.35, {
  //       spread: 100,
  //       decay: 0.91,
  //       scalar: 0.8
  //     });
  //     fire(0.1, {
  //       spread: 120,
  //       startVelocity: 25,
  //       decay: 0.92,
  //       scalar:1.2
  //     });
  //     fire(0.1, {
  //       spread:120 ,
  //      startVelocity :45 
  //    });
  //  }, []); }

  useEffect(() => {
    checkAccount();
    console.log(localStorage.getItem('userNumber'))
    console.log('로컬', data)
    if (account) {
      checkBalance();
    }
    checkPlan()
 }, [account]); // account 상태 업데이트 될때마다 재실행

 useEffect(() => {
  console.log('플랜', plan);
}, [plan]);

  useEffect(() => {
    if (getToday() > plan.endDate) {
      finishTrip();
    }
  }, [plan]);

  return (
    <div className={styles.div}>
      <div className={styles.balanceDiv}>
        <div className={styles.logoNAccount}>
          <img src={shinhan} alt='shinhan' className={styles.logo}/>
          <div className={styles.yejukNAccount}>
            <p className={styles.yejuk}>예적금</p>
            {/* <p className={styles.account}>{formatAccountNumber(String(account))}</p> */}
            <div className={styles.account}>{account ? formatAccountNumber(account) : 
            <Skeleton.Input style={{borderRadius:'2rem', width: 150 }} active size="small" />}</div>
          </div>
        </div>
        <div className={styles.balance}>
          {balance ? `${formatBalance(balance)}원` :
          <Skeleton.Input style={{marginTop: '-1rem', borderRadius:'2rem', width: 80 }} active size="large" />}</div>
        
        {Array.isArray(plan) && plan.length === 0 ? (
          <>
            <Link to='/plan'>
            <Button 
              size="large" 
              style={{ height: '3rem', backgroundColor:'#316FDF', fontFamily:"preRg", width:'80vw'}}
              className={styles.startTrip}
              type="primary">여행 등록하러 GO</Button></Link>
          </>
        ) : (
          // 현재날짜와 plan.endDate 비교해서 분기처리
          <>
            {getToday() === plan.endDate ? (
                <Button 
                  size="large" 
                  style={{ height: '3rem', backgroundColor:'#316FDF', fontFamily:"preRg", width:'80vw'}}
                  className={styles.startTrip}
                  type="primary"
                  onClick={finishTrip}>여행 종료하기</Button>
            ) : getToday() < plan.startDate ? (
                <Link to={{
                  pathname: '/budget',
                  search: `?planId=${planId}`
                }} >
                <Button 
                  size="large" 
                  style={{ color: 'white', opacity:'0.6', height: '3rem', backgroundColor:'#316FDF', fontFamily:"preRg", width:'80vw'}}
                  className={styles.startTrip}
                  type="primary" disabled>아직 여행 시작일이 아닙니다</Button></Link>
            ) : getToday() > plan.endDate ? (
                finishTrip()
            ) : (
                <Link to={{
                  pathname: '/budget',
                  search: `?planId=${planId}`
                }} >
                <Button 
                  size="large" 
                  style={{ height: '3rem', backgroundColor:'#316FDF', fontFamily:"preRg", width:'80vw'}}
                  className={styles.startTrip}
                  type="primary">여행 시작하기</Button></Link>
            )}
          </>
      )}

      </div>
      <div className={styles.scheduleNIcon}>
        <p className={styles.scheduleTitle}>{name}님의 여행 일정</p>
        <CalendarOutlined style={{ fontSize:'1.5rem', marginLeft: '0.5rem', paddingTop:'2.9rem'}} />
      </div>
      

      <div className={styles.scheduleDiv}>
        {Array.isArray(plan) && plan.length === 0 ? (
          <>
            <p className={styles.noSchedule1}>등록된 여행 일정이 없습니다</p>
            <p className={styles.noSchedule2}>쏠트립과 함께 새로운 여행을 시작해보세요!</p>
          </>
        ) : (
          <>
          <p className={styles.schedule}>{plan.startDate} ~ {plan.endDate}</p>
          <Link to={`/plan/${planId}`}>
          <Button 
            size="medium" 
            style={{ 
              border:'1px solid', 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.2)',
              // opacity: 0.4,
              borderColor:'white', 
              fontWeight: '900', 
              fontFamily:"preBd",
              paddingTop: '0.2rem'}}
              className={styles.startTrip}
            >예산 상세보기</Button></Link>
          </>
        )}     
        
      </div>



    </div>
  );
};

export default BalanceSchedule;
