import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from "./Analysis.module.css";
import axios from "axios";

const Analysis = () => {
  const data = localStorage.getItem('userNumber');
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get('planId');
  const [totalBudget, setTotalBudget] = useState(0) // 총 전체 예산
  const [amount, setAmount] = useState(0) // +/- 금액
  const [budgetOvers, setBudgetOvers] = useState([]) // 초과한 날짜

  const getPortDetail = async () => {
    try {
      const response = await axios.get(`https://sawsim.site/api/portfolio/${planId}/budget`, { headers: { "User-Number": data } });
      console.log(response)
      console.log(response.data.dataBody.dataBody.totalBudget)
      const total = response.data.dataBody.dataBody.totalBudget
      console.log(response.data.dataBody.dataBody.amount)
      const left = response.data.dataBody.dataBody.amount
      console.log(response.data.dataBody.dataBody.budgetOvers)
      setTotalBudget(parseFloat(((total - left) / total * 100).toFixed(1)));
      
      setAmount(total - Math.abs(left))
      setBudgetOvers(response.data.dataBody.dataBody.budgetOvers)
    } catch (error) {
      console.error(error);
    }
  }

  function formatBalance(balance) {
    const positiveAmount = Math.abs(amount);
    return positiveAmount.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  const formatDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}.${month}.${day}`;
};

  useEffect(() => {
    console.log(planId)
    getPortDetail()
  }, [planId])

  return (
    <div>
      <div className={styles.balanceDiv}>
        <div className={styles.logoNAccount}>
          <p className={styles.analysisMent}><span className={styles.emphasis}>전체 예산</span>의 <span className={styles.emphasisBlue}> {totalBudget}%</span>를 사용했네요! </p>
          {amount > 0 ? (
            <p className={styles.analysisMent}><span className={styles.emphasisBlue}>{formatBalance(amount)}원</span>을 절약했습니다.</p>
            ) : (
              <p className={styles.analysisMent}><span className={styles.emphasisBlue}>{formatBalance(amount)}원</span>을 초과지출했습니다.</p>
              )}
           <p className={styles.analysisMent}>일일 예산을 초과한 날은</p>
          {budgetOvers.map((item, index) => (
            <>8
            <span className={styles.emphasis}>{formatDate(item)} / </span></>
          ))}
          <p className={styles.analysisMent}>입니다.</p>
        </div>
      </div>
    </div>
  )
}

export default Analysis

// 전체 여행 예산의 87%를 사용했네요!
// 120,840원을 절/gkdl약했습니다

// 일일 예산을 초과한 날은 8/25 첫째날입니다.
