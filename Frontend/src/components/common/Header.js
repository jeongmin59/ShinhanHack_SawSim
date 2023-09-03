import React from 'react';
import styles from './Header.module.css'
import comment from './comment.png'
import microphone from './microphone.png'
import user from './user.png'


const Header = () => {
  return (
    <div className={styles.header}>
      <p className={styles.title}>쏠트립</p>
      <div className={styles.icons}>
        <img className={styles.comment} src={comment} alt="comment"/>
        <img className={styles.microphone} src={microphone} alt="microphone"/>
        <img className={styles.user} src={user} alt="user"/>
      </div>
    </div>
  )
}

export default Header;