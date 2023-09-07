import React from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from "./Dutch.module.css";
import Header from "../components/common/Header";
import { Button, Table } from 'antd';

const columns = [
  {
    title: '일시',
    dataIndex: '일시',
    width: '45%',

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


  const data = selectedRows;

  return (
    <div>
      <Header/>
      {selectedRows && (
        <div>
          <h2>선택된 행 데이터:</h2>
          <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
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