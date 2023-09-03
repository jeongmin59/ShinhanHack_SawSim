import {React,useState} from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./TransferOne.module.css";
import { Button, Input, Space } from 'antd';
import axios from "axios";
import Api from '../../Api/Api';

const TransferOne = () => {
  const location = useLocation()
  const data = location.state?.data
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState(data || "")

  // 올바른 계좌번호인지 확인하는 axios 요청
  const checkValid = async () => {
    try {
      const requestData = {
        dataHeader: {
          apikey: "2023_Shinhan_SSAFY_Hackathon",
        },
        dataBody: {
          입금은행코드: "088",
          입금계좌번호: keyword,
          입금통장메모: "1234",
        },
      };
      const response = await axios.post("/api1/v1/auth/1transfer", requestData);
      console.log(response.data.dataHeader.successCode);
      // goToMain();
  
      if (response.data.dataHeader.successCode === 0) {// 인증된 계좌번호면
        goToMain();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 올바른 계좌번호일 때 실행할 함수
  const goToMain = () => {
    navigate('/main', { state: { data: keyword } });
    console.log(keyword)
  }

  const onChange = (event) => {
    setKeyword(event.target.value)
  }
  
  return (
    <div>
          <Space.Compact
      style={{
        width: '90%',
      }}
    >
      <Input 
        onPressEnter={checkValid}
        value={keyword}
        onChange={onChange}
        style={{fontFamily:"lineRg"}} 
        size="large" 
        className={styles.input} 
        placeholder="신한은행 계좌를 - 없이 입력하세요" 
        allowClear />
      <Button 
        style={{fontFamily:"lineRg", paddingTop:'0.5rem'}} 
        size="large" 
        className={styles.submit} 
        onClick={checkValid}
        type="primary">이체하기</Button>
    </Space.Compact>
    </div>
  )
}

export default TransferOne