import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./CreateInPerson.module.css";
import { EditOutlined, FormOutlined, ScanOutlined } from '@ant-design/icons';

const CreateInPerson = () => {
  return (
    <div>
      <div className={styles.titles}>
        <Link className={styles.backLink} to='/cash'><p className={styles.toBack}>&lt;</p>
        <p className={styles.cashTitle}>직접 기록하기</p></Link> 
      </div>
    </div>
  )
}

export default CreateInPerson