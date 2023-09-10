import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from "./TransactionDetail.module.css";
import Header from "../components/common/Header";
import { Button, Modal, Input } from 'antd';
import { CloseOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import pencil from "../assets/pencil2.png";


const TransactionDetail = () => {
  const location = useLocation();
  const selectedRow = location.state.selectedRow;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memo, setMemo] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    // 여기에 put axios 요청 보내는 함수 넣기
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleMemoChange =(e) =>{
    setMemo(e.target.value)
  }
  
  return (
    <div>
      <Header/>
      <div className={styles.titles}>
        <p className={styles.transactionTitle}>거래 상세내역</p>
        <Link className={styles.backLink} to='/transaction'>
          <CloseOutlined style={{fontSize: '1.5rem', marginRight: '1.3rem', marginTop: '1.5rem'}} />
        </Link>
      </div>
      <div className={styles.memos}>
          <p className={styles.memo}>메모입력</p>
          <img onClick={showModal} className={styles.pencil} src={pencil} alt="createMemo"/>
      </div>

      <Modal 
        title="메모를 입력해주세요" 
        open={isModalOpen} 
        closeIcon={false}
        footer={[
          <Button style={{fontFamily:'preRg'}} key="back" onClick={handleCancel}>
            닫기
          </Button>,
          <Button style={{fontFamily:'preRg'}} key="submit" type="primary" onClick={handleOk}>
            확인
          </Button>]}
          bodyStyle={{marginLeft: 0, color:'red'}}
          style={{fontFamily:'preRg', width:'100%'}}
          centered={true}
          maskStyle={{opacity:'0.2'}}
          width={400}
          >
        <Input onChange={handleMemoChange} showCount maxLength={15} style={{marginBottom: '0.8rem', fontSize: '1.1rem', fontFamily:'preRg', borderRadius:0, borderBottom:'2px solid #316FDF'}} placeholder="최대 15자 입력" bordered={false} />
      </Modal>

      <div className={styles.container}>
        <hr/>
        <div className={styles.elements}>
          <p className={styles.elementTitle}>거래일시</p>
          <p className={styles.elementContent}>{selectedRow.일시}</p>
        </div>
        <div className={styles.elements}>
          <p className={styles.elementTitle}>상세내역</p>
          <p className={styles.elementContent}>{selectedRow.상세내역}</p>
        </div>
        <div className={styles.elements}>
          <p className={styles.elementTitle}>거래금액</p>
          <p className={styles.elementContent}>{selectedRow.금액}</p>
        </div>
        <div className={styles.elements}>
          <p className={styles.elementTitle}>거래구분</p>
          <p className={styles.elementContent}>{selectedRow.구분}</p>
        </div>
        <hr/>
      </div>


    </div>
  )
}

export default TransactionDetail