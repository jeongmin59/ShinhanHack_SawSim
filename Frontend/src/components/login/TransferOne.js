import React from 'react';
import styles from "./TransferOne.module.css";
import { Button, Input, Space } from 'antd';

const TransferOne = () => {
  return (
    <div>
          <Space.Compact
      style={{
        width: '90%',
      }}
    >
      <Input style={{fontFamily:"lineRg"}} size="large" className={styles.input} placeholder="신한은행 계좌를 - 없이 입력하세요" allowClear />
      <Button style={{fontFamily:"lineRg", paddingTop:'0.5rem'}} size="large" className={styles.submit} type="primary">이체하기</Button>
    </Space.Compact>
    </div>
  )
}

export default TransferOne