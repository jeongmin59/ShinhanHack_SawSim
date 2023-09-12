import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styles from "./Analysis.module.css";

const Analysis = () => {
  const [totalBudget, setTotalBudget] = useState(0) // 총 몇퍼 썼나
  const [amount, setAmount] = useState("") // +/- 금액
  const [budgetOver, setBudgetOver] = useState([]) // 초과한 날짜

  return (
    <div>
      <div className={styles.titles}>
        <Link className={styles.backLink} to='/main'><p className={styles.toBack}>&lt;</p>
        <p className={styles.portfolioTitle}>여행 포트폴리오</p></Link>
      </div>
      <p></p>
    </div>
  )
}

export default Analysis