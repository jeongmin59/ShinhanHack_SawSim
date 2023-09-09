import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./PopularSpots.module.css";
import { EditOutlined, FormOutlined, ScanOutlined } from '@ant-design/icons';

const PopularSpots = () => {
  return (
    <div>
      <div className={styles.titles}>
        <Link className={styles.backLink} to='/budget'><p className={styles.toBack}>&lt;</p>
        <p className={styles.popularTitle}>뒤로가기</p></Link> 
      </div>
    </div>
  )
}

export default PopularSpots