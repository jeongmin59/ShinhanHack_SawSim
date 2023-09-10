import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./CashorOCR.module.css";
import { EditOutlined, FormOutlined, ScanOutlined } from '@ant-design/icons';
import cash from '../../assets/cash.png'

const CashorOCR = () => {
  return (
    <div>
      <div className={styles.titles}>
        <Link className={styles.backLink} to='/budget'><p className={styles.toBack}>&lt;</p>
        <p className={styles.cashTitle}>현금 기록하기</p></Link> 
      </div>
      <img style={{width:'10rem', marginTop:'4rem', marginLeft:'1rem'}} src={cash} alt="cash"/>
      <div className={styles.icons}>
        <div className={styles.iconNment}>
          <ScanOutlined style={{marginTop: '1rem', opacity: '0.7', fontSize: '3rem'}} />
          <p className={styles.ment}>영수증 스캔하기</p>
        </div>
        <Link className={styles.toCreate} to='/cash/create'>
          <div className={styles.iconNment}>
            <FormOutlined style={{marginTop: '1rem', opacity: '0.7', fontSize: '3rem'}} />
            <p className={styles.ment}>직접 기록하기</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default CashorOCR