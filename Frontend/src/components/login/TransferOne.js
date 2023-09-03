import {React,useState} from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./TransferOne.module.css";
import { Button, Input, Space } from 'antd';
import axios from "axios";
import Api from '../../Api/Api';
import { EyeInvisibleOutlined, EyeTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';

const TransferOne = () => {
  const location = useLocation()
  const data = location.state?.data
  const navigate = useNavigate()

  const [name, setName] = useState(data || "")
  const [account, setAccount] = useState(data || "")
  const [showRandomInput, setShowRandomInput] = useState(false);


  // 1차로 예금주 일치 확인, 2차로 본인 계좌인지 검증(랜덤번호)

  // 1. 사용자가 이름, 계좌 입력 -> 이름 : setName, 계좌 : setAccount
  // 2. 계좌 예금실명주 api(신한 api) 입력된 이름(name)과 같은지 확인 -> 일치 시 
  // 3. 1원 이체 입금통장메모에 랜덤 숫자 4개 넣어서 보냄 (신한 api) = 인증번호 발송
  // 4. 동시에 1원 이체 입금통장메모 저장 api도 보냄 (백 api) - 인증번호 뭔지 백에도 알리기
  // 5. 인증번호 입력하는 인풋 새로 생김 > 사용자 입력
  // 6. 입력번호 1원 이체 인증번호 검증 및 계좌 등록 api로 보내 0 또는 1 띄움 (백 api)
  // 7. 0이면(올바르면) 계좌 등록 되고 userNumber 받음
  // 8. 이거 스토리지에 저장하던지 다음페이지로 넘기던지 ,, 
  // 여기서부턴 메인페이지(여행 시작 전) 넘어가서
  // 9. 메인페이지에서 userNumber 이용해 계좌 조회
  // 10. 계좌번호로 잔액 조회 (신한 api)

  
  // 1. 입력된 이름 setName
  const onChangeName = (event) => {
    setName(event.target.value)
  }
  // 1. 입력된 계좌 setAccount
  const onChangeAccount = (event) => {
    setAccount(event.target.value)
  }
  
  // 3. 랜덤번호 1원이체 메모에 담아서 1원 송금 (신한 api)
  const sendRandom = async (randomNumber) => {
    console.log(randomNumber)
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

  // 4. 백에다가도 랜덤번호 보내기
  const sendRandomToBack = async (randomNumber) => {
    try {
      const requestData = {
        dataBody: { 
          accountNumber: account,
          name: name,
          authMemo: randomNumber
      }}
      const response = await axios.post("/api2/auth/memo", requestData);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  // 2. 입력받은 예금주와 예금실명주 일치하는지 확인
  const checkName = async () => {
    try {
      const requestData = {
        dataHeader: {
          apikey: "2023_Shinhan_SSAFY_Hackathon",
        },
        dataBody: {
          입금은행코드: "088",
          입금계좌번호: account,
        },
      };
      const response = await axios.post("/api1/v1/search/name", requestData);
      console.log(response.data)
      console.log(response.data.dataBody.입금계좌성명);
      console.log(name)
      if (response.data.dataBody.입금계좌성명 === name) {// 예금주가 같다면?
        // 1원 이체 입금통장메모에 랜덤 숫자 4개 넣어서 보냄 (신한 api) = 인증번호 발송
        const randomNumber = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
        sendRandom(randomNumber);
        // 동시에 1원 이체 입금통장메모 저장 api도 보냄 (백 api) - 인증번호 뭔지 백에도 알리기
        sendRandomToBack(randomNumber);
        // 예금주, 계좌번호 입력창 사라지고 인증번호 입력 인풋으로 바뀌기 위한 set 
        setShowRandomInput(true)
      } else {
        window.alert('예금주를 다시 확인해주세요.')
      }
    } catch (error) {
      console.error(error);
    }
  };


  // 8. 올바른 계좌번호일 때 실행할 함수
  const goToMain = () => {
    navigate('/main', { state: { data: account } });
    console.log(account)
  }

  return (
    <div>
      {showRandomInput ? ( // 인증번호 입력 인풋
        <>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <ExclamationCircleOutlined />
            <p style={{marginLeft: '0.2rem', paddingTop:'0.1rem'}}>입금통장 메모의 숫자 4자리를 입력해주세요.</p>
          </div>
          <Space.Compact style={{width: '40%'}}>
            <Input.Password
              style={{fontFamily:"lineRg"}} 
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}              
              size="large" />
          </Space.Compact> 
        </>
      ) : ( // 처음 예금주, 계좌번호 입력 인풋
        <>
          <Space.Compact style={{width: '90%'}}>
            <Input 
              addonBefore="예금주"
              value={name}
              onChange={onChangeName}
              style={{fontFamily:"lineRg"}} 
              size="large" 
              className={styles.input} 
              placeholder="예금주를 입력해주세요" 
              allowClear />
            </Space.Compact> 
            <Space.Compact style={{width: '90%'}}>
            <Input 
              addonBefore="계좌번호"
              onPressEnter={checkName}
              value={account}
              onChange={onChangeAccount}
              style={{fontFamily:"lineRg"}} 
              size="large" 
              className={styles.input} 
              placeholder="계좌번호를 - 없이 입력해주세요" 
              allowClear />
            </Space.Compact>      
          <Button 
              style={{backgroundColor:'#0046FF', fontFamily:"lineRg", paddingTop:'0.5rem', borderRadius:'1.5rem'}} 
              size="large" 
              className={styles.submit} 
              onClick={checkName}
              type="primary">인증번호 받기</Button>
        </>
      )}
    </div>
  )
}

export default TransferOne