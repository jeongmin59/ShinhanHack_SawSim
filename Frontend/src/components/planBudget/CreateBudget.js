import React, { useState, useEffect } from 'react';
import { Select, InputNumber, Button, Space } from 'antd';
import axios from "axios";
import styles from './CreateBudget.module.css';
import DeleteBudget from './DeleteBudget';
import '../../pages/Transaction.css'

const { Option } = Select;

const CreateBudget = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [isEditMode, setIsEditMode] = useState(false); // 추가 및 수정 모드

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  useEffect(() => {
    // 예산 목록 호출
    async function fetchBudgets() {
      try {
        const response = await axios.get("/budget/{plan_id}"); // 예산 목록을 가져오는 API 엔드포인트
        const budgets = response.data; // 가져온 예산 목록 데이터
  
        // 예산 목록에 예산이 있는지 확인
        const hasBudgets = budgets.length > 0;
  
        // 예산이 있는 경우 isEditMode를 true로 설정
        if (hasBudgets) {
          setIsEditMode(true);
        }
      } catch (error) {
        console.error('예산 목록 가져오기 실패', error);
      }
    }
  
    fetchBudgets();  // 컴포넌트가 마운트될 때 한 번만 실행
  }, []);
  

  // 백엔드랑 연결 후에 수정하기!!!
  const handleAddOrUpdateBudget = async () => {
    try {
      const requestData = {
        dataBody: {
          "travelDate": "2023-08-25", // 날짜 변경 요망
          "category": "교통비",
          "amount": "30000"
        },
      };

      if (isEditMode) {
        // 예산 수정 요청 (PUT 요청)
        const response = await axios.put("/budget/{plan_id}", requestData);
        console.log(response.data);
        if (response.ok) {
          console.log('예산 수정 성공');
        } else {
          console.error('예산 수정 중 오류');
        }
      } else {
        // 예산 추가 요청 (POST 요청)
        const response = await axios.post("/budget/{plan_id}", requestData);
        console.log(response.data);
        if (response.ok) {
          console.log('예산 추가 성공');
        } else {
          console.error('예산 추가 중 오류');
        }
      }
    } catch (error) {
      console.error('에러', error);
    }
  };

  return (
    <div>
      <h2>{isEditMode ? '예산 수정하기' : '예산 추가하기'}</h2>
      <form className={styles.dateItem}>
        <label className={styles.category}>
          <p className={styles.categoryTitle}>카테고리</p>
          <Select
            placeholder="선택"
            onChange={handleCategoryChange}
            style={{ width: '40%', fontFamily: "preRg" }}
          >
            <Option value="food">음식점</Option>
            <Option value="transportation ">교통,수송</Option>
            <Option value="accommodation">여행</Option>
            <Option value="healthcare">의료, 건강</Option>
            <Option value="etc">기타</Option>
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
              parser={(value) => value.replace(/\₩\s?|(,*)/g, '')}
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
              width: '35%',
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
