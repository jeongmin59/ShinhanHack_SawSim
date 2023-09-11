import React, { useState, useEffect } from 'react';
import { Select, InputNumber, Button, Space } from 'antd';
import axios from "axios";
import styles from './CreateBudget.module.css';
import DeleteBudget from './DeleteBudget';
import { useLocation } from 'react-router-dom';
  
const { Option } = Select;
  
const CreateBudget = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [isEditMode, setIsEditMode] = useState(false); // 추가 및 수정 모드
  // const location = useLocation();
  // console.log("location.state:", location.state);
  // const { formattedDate } = location.state || {};
  // const { latestPlanId } = location.state || {};
  const { state } = useLocation();
  const formattedDate = state?.formattedDate;
  const lastPlanId = state?.lastPlanId;

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleAddOrUpdateBudget = async () => {
    try {
      const requestData = {
        dataBody: {
          travelDate: formattedDate,
          category: setCategory,
          amount: setAmount,
        },
      };

      if (isEditMode) {
        const response = await axios.put(`/budget/${lastPlanId}`, requestData);
        if (response.data.dataHeader.successCode === "0") {
          console.log('예산 수정 성공');
        } else {
          console.error('예산 수정 중 오류');
          console.log('예산 수정 성공');
        }
      } else {
        const response = await axios.post(`/budget/${lastPlanId}`, requestData);
        if (response.data.dataHeader.successCode === "0") {
          console.log('예산 추가 성공');
        } else {
          console.error('예산 추가 중 오류');
          console.log(response.data.dataHeader);
        }
      }
    } catch (error) {
      console.error('에러', error);
      // console.log(response.data);
    }
  };

  console.log("formattedDate:", formattedDate);
  console.log("lastPlanId:", lastPlanId);



return (
  <div>
    {/* <h2>{isEditMode ? '예산 수정하기' : '예산 추가하기'}</h2> */}
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
          <Option value="여행">여행</Option>
          <Option value="의료,건강">의료,건강</Option>
          <Option value="기타">기타</Option>
        </Select>
      </label>
      <br />
      <br />
      <label className={styles.amount}>
        <p className={styles.amountTitle}>예산</p>
        <Space.Compact className={styles.amountInput}>
          <InputNumber addonAfter="₩"
            min={1}
            value={amount}
            onChange={handleAmountChange}
            style={{ width: '80%' }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\\s?|(,*)/g, '')}
          />
        </Space.Compact>
      </label>
      <br />
      <br />
      <div className={styles.btnContainer}>
        <Button type="primary"
          onClick={handleAddOrUpdateBudget}
          style={{
            height: '2.5rem',
            width: '40%',
            marginRight: '1rem',
            backgroundColor: '#316FDF',
            fontFamily: "preRg"
          }}
          size="large">
          {isEditMode ? '예산 수정하기' : '예산 추가하기'}
        </Button>
        <DeleteBudget />
      </div>
    </form>
  </div>
  );
};

export default CreateBudget;
