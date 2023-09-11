import React from 'react';
import { Link } from 'react-router-dom'
import styles from '../pages/PlanBudget.module.css'
import Header from "../components/common/Header";
import BudgetList from "../components/planBudget/BudgetList"
// import { Button } from 'antd';

const Planbudget = () => {
  // const reloadPage = () => {
  //   window.location.reload();
  // }

  return (
    <div>
     <div>
      <Header/>
      <div className={styles.titles}>
        <Link className={styles.backLink} to='/plan'><p className={styles.toBack}>&lt;</p>
        <p className={styles.popularTitle}>일정 확인</p></Link> 
      </div>
      {/* <Button onClick={reloadPage}><Link to="/plan">뒤로가기</Link></Button> */}
      <BudgetList/>
      </div>
    </div>
  );
};

export default Planbudget;
