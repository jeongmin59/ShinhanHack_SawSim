import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./PortfolioDetail.module.css";
import Header from "../components/common/Header";
import Map from "../components/portfolio/Map"
import Analysis from "../components/portfolio/Analysis"
import { CloseOutlined } from '@ant-design/icons';


const PortfolioDetail = () => {
  return (
    <div>
      <Header/>
      <div className={styles.titles}>
        <p className={styles.transactionTitle}>추억이 담긴 여행 돌아보기</p>
        <Link className={styles.backLink} to='/portfolio'>
          <CloseOutlined style={{fontSize: '1.3rem', marginRight: '1.3rem', marginTop: '1.5rem'}} />
        </Link>
      </div>
      <Analysis/><br/><br/>
      <Map/>
    </div>
  )
}

export default PortfolioDetail