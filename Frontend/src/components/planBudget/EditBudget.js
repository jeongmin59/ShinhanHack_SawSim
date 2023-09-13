import React, { useState, useEffect } from 'react';
import { Select, InputNumber, Button, Space, Popconfirm, message } from 'antd';
import axios from "axios";
import styles from './CreateBudget.module.css';
import { Link, useLocation } from 'react-router-dom';
  
const { Option } = Select;
  
const EditBudget = () => {
  const { state } = useLocation();
  const formattedDate = state?.formattedDate;
  const planId = state?.planId;
  const category = state?.category;
  const amount = state?.amount;
    
  const [editCategory, setEditCategory] = useState(category);
  const [editAmount, setEditAmount] = useState(amount);

  const handleCategoryChange = (value) => {
    setEditCategory(value);
  };

  const handleAmountChange = (value) => {
    setEditAmount(value);
  };

  const handleAddOrUpdateBudget = async () => {
    try {
      const requestData = {
        dataBody: {
          travelDate: formattedDate,
          category: editCategory !== category ? editCategory : category,
          amount: editAmount !== amount ? editAmount : amount,
        },
      };
      const response = await axios.put(`https://sawsim.site/api/budget/${planId}`, requestData)
      console.log('성공', response.data);
    } catch (error) {
      console.error('에러', error);
    }
  };

  const handleDeleteBudget = async () => {
    try {
      const requestData = {
        data: {
            dataBody: {
              travelDate: formattedDate,
              category: editCategory !== category ? editCategory : category,
              amount: editAmount !== amount ? editAmount : amount,
            },
        }
      };
      const response = await axios.delete(`https://sawsim.site/api/budget/${planId}`, requestData)
      console.log('성공', response.data);
      message.success('예산이 삭제되었습니다.');
    } catch (error) {
      console.error('에러', error);
    }
  };

  console.log("formattedDate:", formattedDate);
  console.log("planId:", planId);
  console.log("editCategory:", editCategory);
  console.log("category:", category);
  console.log("editamount:", editAmount);
  console.log("amount:", amount);


return (
  <div>
    <Link className={styles.backLink} to={`/plan/${planId}`}><p className={styles.toBack}>&lt;</p>
    <p className={styles.popularTitle}>뒤로가기</p></Link> 
    <h3>{formattedDate}</h3>
    <form className={styles.dateItem}>
      <label className={styles.category}>
        <p className={styles.categoryTitle}>카테고리</p>
        <Select
          value={editCategory}
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
            value={editAmount}
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
      <Link
          to={`/plan/${planId}`}
        >
        <Button type="primary"
          onClick={handleAddOrUpdateBudget}
          style={{
            height: '2.5rem',
            width: '42%',
            marginRight: '1rem',
            backgroundColor: '#316FDF',
            fontFamily: "preRg"
          }}
          size="large">
            수정하기
        </Button>

        <Button danger
          onClick={handleDeleteBudget}
          // type="dashed"
          style={{
            height: '2.5rem',
            width: '42%',
            marginRight: '1rem',
            fontFamily: "preRg",
          }}
          size="large">
            삭제하기
        </Button>
        </Link>
      </div>
    </form>
  </div>
  );
};

export default EditBudget;
