import React, { useState } from 'react';
import { Select, InputNumber, Button, Space } from 'antd';
import axios from "axios";
import styles from './CreateBudget.module.css';
import { Link, useLocation } from 'react-router-dom';
  
const { Option } = Select;
  
const CreateBudget = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const { state } = useLocation();
  const formattedDate = state?.formattedDate;
  const planId = state?.planId;


  const handleCategoryChange = (value) => {
    setCategory(value);
    console.log(category)
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleAddOrUpdateBudget = async () => {
    try {
      const requestData = {
        dataBody: {
          travelDate: formattedDate,
          category: category,
          amount: amount,
        },
      };
      const response = await axios.post(`https://sawsim.site/api/budget/${planId}`, requestData)
      console.log('성공', response.data);
      window.location.reload();
    } catch (error) {
      console.error('에러', error);
    }
  };

  console.log("formattedDate:", formattedDate);
  console.log("planId:", planId);


return (
  <div>
    <Link className={styles.backLink} to={`/plan/${planId}`}><p className={styles.toBack}>&lt;</p>
    <p className={styles.popularTitle}>뒤로가기</p></Link> 
    <h3 className={styles.todayDate}>{formattedDate}</h3>
    <form className={styles.dateItem}>
      <label className={styles.category}>
        <p className={styles.categoryTitle}>카테고리</p>
        <Select
          placeholder="선택"
          onChange={handleCategoryChange}
          style={{ width: '40%', fontFamily: "preRg" }}
        >
          <Option value="음식점">음식점</Option>
          <Option value="교통,수송">교통,수송</Option>
          <Option value="스포츠,레저">스포츠,레저</Option>
          <Option value="관광지">관광지</Option>
          <Option value="숙박">숙박</Option>
          <Option value="기타">기타</Option>
        </Select>
      </label>
      <br />
      <br />
      <label className={styles.amount}>
        <p className={styles.amountTitle}>예산</p>
        <Space.Compact className={styles.amountInput}>
        <InputNumber
          addonAfter="₩"
          min={1}
          value={amount}
          onChange={handleAmountChange}
          style={{ width: '80%' }}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/₩\s?|(,*)/g, '')}
          step={1}
        />
        </Space.Compact>
      </label>
      <br />
      <br />
      <div className={styles.btnContainer}>
        <Link
          to={`/plan/${planId}`}
        >
        <Button type="primary"
          onClick={handleAddOrUpdateBudget}
          style={{
            height: '2.5rem',
            // width: '60%',
            // marginRight: '1rem',
            backgroundColor: '#316FDF',
            fontFamily: "preRg"
          }}
          size="large">
            예산 추가하기
        </Button>
        </Link>
      </div>
    </form>
  </div>
  );
};

export default CreateBudget;
