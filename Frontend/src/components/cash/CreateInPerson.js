import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./CreateInPerson.module.css";
import { EditOutlined, FormOutlined, ScanOutlined } from '@ant-design/icons';
import { Input, InputNumber, message, Row, Col, Button } from 'antd';
import axios from "axios";


const CreateInPerson = () => {
  const data = localStorage.getItem('userNumber');

  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [amount,setAmount] = useState(null);
  const [memo,setMemo] = useState("");
  const [store,setStore] = useState("");
  
const onChange = (value) => {
  const valueStr = String(value);

  if (valueStr.length !== 8 || isNaN(Number(valueStr))) {
    message.warning('YYYYMMDD 형태로 입력해주세요');
    return;
  }

  setDate(value); // 날짜 상태 업데이트

  console.log('changed', value);
};


  
  const handleHourChange = (value) => {
    let newHour = value;

    if (newHour > 24) {
      newHour = 24;
    }

    setHour(newHour);
    
    console.log('Hour changed', newHour);
  };

  const handleMinuteChange = (value) => {
    let newMinute = value;

    if (newMinute > 59) {
      newMinute= 59;
     }

     setMinute(newMinute);

     console.log('Minute changed', minute);
   };

   const handleAmountChange =(value) =>{
    setAmount(value)
}

const handleMemoChange =(e) =>{
    setMemo(e.target.value)
}

const handleTransactionChange =(e) =>{
  setStore(e.target.value)
}

const formatDate = (date) => {
  const dateStr = String(date);
  return `${dateStr.slice(0,4)}-${dateStr.slice(4,6)}-${dateStr.slice(6,8)}`;
};

const formatTime = (hour, minute) => {
  return `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`;
};

const handleSubmit= () => {
    const transactionDate = formatDate(date);
    const transactionTime = formatTime(hour, minute);
  console.log('Amount:', amount);
  console.log('Memo:', memo);
  console.log('store:', store);
  console.log('거래일시:', transactionDate, transactionTime);

  const registerCash = async () => {
    try {
      const requestData = {
        dataBody: { 
          transactionHistory: {
            transactionDate: transactionDate,
            transactionTime: transactionTime,
            amount: amount,
            content: memo,
            storeName: store,
            paymentType: "CASH"
          }
      }}
      const headers = {
        "User-Number": data
      }
      const response = await axios.post("/api2/transactions", requestData, {headers:headers});
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }
  registerCash();
};

  return (
    <div>
      <div className={styles.titles}>
        <Link className={styles.backLink} to='/cash'><p className={styles.toBack}>&lt;</p>
        <p className={styles.cashTitle}>직접 기록하기</p></Link> 
      </div><br/>

      <div style={{ margin:'0.5rem 0',display: 'flex', justifyContent: 'center' }}>

      <InputNumber 
        
        min={20230101}
        max={99999999}
        onChange={onChange}
        placeholder="YYYYMMDD 형태로 입력하세요."
        style={{ width: '80%',margin:'0.5rem 0' }}
        addonBefore="거래일시"
        size='large'

      /></div>

<Row gutter={8} style={{margin:'0.5rem 0' }} justify="center" align="middle">
  <Col>
    <InputNumber
    
      min={0}
      max={24}
      value={hour}
      onChange={handleHourChange}
      formatter={(value) => `${value}`.padStart(2, '0')}
      parser={(value) => value.replace(/\D/g, '')}
      size='large'

    />
  </Col>
  <Col>시</Col>
  <Col>
    <InputNumber
    

      min={0}
      max={59}
      value={minute}
      onChange={handleMinuteChange}
      formatter={(value) => `${value}`.padStart(2, '0')}
      parser={(value) => value.replace(/\D/g, '')}
      size='large'

    />
  </Col>
  <Col>분</Col>
</Row>

    <Input 
      placeholder="상세내역을 입력하세요."
      value={store}
      onChange={handleTransactionChange}  
      style={{ width: '80%', margin:'0.5rem 0' }}
      addonBefore="상세내역"
      allowClear={true}
      size='large'
      maxLength={15}
      />
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <InputNumber
        style={{ width: '80%', margin:'0.5rem 0' }}
        min={1}
        addonAfter="원"
        value={amount}
        onChange={handleAmountChange}
        addonBefore="거래금액"
        placeholder="거래금액을 입력하세요."

        size='large'
      />
    </div>
       
       <Input 
          placeholder="메모를 입력하세요."
          value={memo}
          onChange={handleMemoChange}  
          style={{ width: '80%', margin:'0.5rem 0' }}
          addonBefore="메모"
          allowClear={true}
        size='large'
      maxLength={15}
      showCount
       />

      <Button 
              style={{marginTop:'1rem',height: '3rem', width: '80%', backgroundColor:'#316FDF', fontFamily:"preRg"}} 
              size="large" 
              className={styles.submit} 
              onClick={handleSubmit}
              type="primary">등록하기</Button>
    </div>
  )
}

export default CreateInPerson