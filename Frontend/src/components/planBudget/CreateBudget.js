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
  // const [isEditMode, setIsEditMode] = useState(false); // 추가 및 수정 모드
  const { state } = useLocation();
  const formattedDate = state?.formattedDate;
  const lastPlanId = state?.lastPlanId;

  const year = formattedDate.substring(0, 4);
  const month = formattedDate.substring(4, 6);
  const day = formattedDate.substring(6, 8);
  const formattedDateWithHyphen = `${year}-${month}-${day}`;

  console.log("formattedDateWithHyphen:", formattedDateWithHyphen);

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
          travelDate: formattedDateWithHyphen,
          category: category,
          amount: amount,
        },
      };
      const response = await axios.post(`/api2/budget/${lastPlanId}`, requestData)
      console.log('성공', response.data);
    } catch (error) {
      console.error('에러', error);
      // console.log(response.data);
    }
  };

  console.log("formattedDate:", formattedDate);
  console.log("lastPlanId:", lastPlanId);



return (
  <div>
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
            예산 추가하기
        </Button>
        <DeleteBudget />
      </div>
    </form>
  </div>
  );
};

export default CreateBudget;
