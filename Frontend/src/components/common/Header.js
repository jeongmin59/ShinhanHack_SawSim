import React from 'react';
import styles from './Header.module.css'
import { MessageOutlined, AudioOutlined, UserOutlined } from '@ant-design/icons';


const Header = () => {
  return (
    <div className={styles.header}>
      <p className={styles.title}>쏠트립</p>
      <div className={styles.icons}>
        <MessageOutlined className={styles.comment}/>
        <AudioOutlined className={styles.microphone} />
        <UserOutlined className={styles.user}/>
      </div>
    </div>
  )
}

export default Header;