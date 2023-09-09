import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from "./Dutch.module.css";
import Header from "../components/common/Header";
import { Button, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const { Kakao} = window;


const columns = [
  {
    title: '일시',
    dataIndex: '일시',
    width: '43%',
  },
  {
    title: '상세내역',
    dataIndex: '상세내역',
  },
  {
    title: '금액',
    dataIndex: '금액',
    // width: '25%',/
  },
];

const Dutch = () => {
  const location = useLocation();
  const selectedRows = location.state && location.state.selectedRows;
  const resultUrl = window.location.href;
  const data = selectedRows;

  const cardRef = useRef();
  const onDownloadBtn = () => {
    const card = cardRef.current;
    domtoimage.toBlob(card).then(blob => {
      saveAs(blob, 'card.png');
    });
  }


  const share = () => {
    Kakao.Share.sendDefault({
      objectType: 'text',
      text: 'data',
      link: {
            webUrl: resultUrl,
            mobileWebUrl: resultUrl,
          },
        })
    }
    
  useEffect(() => {
    Kakao.cleanup();
    Kakao.init('dcb221d398f716119c61870ef4204001')
    console.log(Kakao.isInitialized())
  }, []);


  return (
    <div>
      <Header/>
      {/* <pre>{JSON.stringify(selectedRows, null, 2)}</pre> */}
      <div className={styles.dutchTitleNIcon}>
        <p className={styles.dutchTitle}>정산 내역보기</p>
        <DownloadOutlined onClick={onDownloadBtn} style={{fontSize: '1.4rem', paddingTop: '0.4rem', paddingRight: '1.5rem'}}/>
      </div>
      {selectedRows && (
        <div className={styles.tableDiv}>
          <Table
            ref={cardRef}
            columns={columns}
            dataSource={data}
            scroll={{ y: '63vh' }}
            pagination={false}
            hideSelectAll={true}
          />
        </div>
      )}
      <Link to='/transaction'>
      <Button 
        style={{height: '3rem', width: '90%', backgroundColor:'#316FDF', fontFamily:"preRg"}} 
        size="large" 
        className={styles.toBack}
        type="primary">확인</Button></Link>
    </div>
  )
}

export default Dutch;