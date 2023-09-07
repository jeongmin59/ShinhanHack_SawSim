import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from "./Dutch.module.css";
import Header from "../components/common/Header";
import { Button, Table } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons'

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
        <ShareAltOutlined onClick={share} style={{fontSize: '1.4rem', paddingRight: '1.5rem'}}/>
      </div>
      {selectedRows && (
        <div>
          <Table
          columns={columns}
          dataSource={data}
          scroll={{ y: '63vh' }}
          pagination={false}
          hideSelectAll={true}
        />
        </div>
      )}
      <div className={styles.transDiv}>
      </div>
    </div>
  )
}

export default Dutch;