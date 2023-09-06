import React, { useState } from 'react';
import { Select, InputNumber, Button } from 'antd';
import styles from './BudgetCreate.module.css';

const { Option } = Select;

const BudgetCreate = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/addBudget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, amount }),
      });

      if (response.ok) {
        // 성공적으로 예산을 추가한 경우 처리
        console.log('성공');
      } else {
        // 예산 추가 중 오류 발생한 경우 처리
        console.error('추가 중 오류');
      }
    } catch (error) {
      console.error('그냥 에러', error);
    }
  };

  return (
    <div>
      <h3>예산 추가하기</h3>
      <form className={styles.dateItem}>
        <label className={styles.category}>
          <p>카테고리:</p>
          <Select
            placeholder="선택"
            optionFilterProp="children"
            onChange={handleCategoryChange}
            style={{ width: '30%' }}
          >
            <Option value="food">식비</Option>
            <Option value="transportation ">교통비</Option>
            <Option value="shopping">쇼핑</Option>
          </Select>
        </label>
        <br />
        <br />
        <label className={styles.amount}>
          <p>예산:</p>
          <InputNumber
            min={1}
            value={amount}
            onChange={handleAmountChange}
            style={{ width: '50%' }}
            formatter={(value) => `₩ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\₩\s?|(,*)/g, '')}

          />
        </label>
        <br />
        <br />
        <Button type="primary" onClick={handleSubmit}>
          예산 추가하기
        </Button>
      </form>
    </div>
  );
};

export default BudgetCreate;
