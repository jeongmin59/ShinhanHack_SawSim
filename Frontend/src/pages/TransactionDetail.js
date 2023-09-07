import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './TransactionDetail.module.css';
import Header from '../components/common/Header';
import { FloatButton, Button, Collapse, Divider, Radio, Table } from 'antd';
import './Transaction.css';

const columns = [
  {
    title: '일시',
    dataIndex: '일시',
    width: '35%',
  },
  {
    title: '상세내역',
    dataIndex: '상세내역',
  },
  {
    title: '금액',
    dataIndex: '금액',
    width: '25%',
  },
];

const data = [
  {
    key: '1',
    일시: '08/24 11:00:12',
    상세내역: '김밥천국',
    금액: '11000',
  },
  {
    key: '2',
    일시: '08/24 11:00:12',
    상세내역: '스타벅스',
    금액: '8200',
  },
];

const TransactionDetail = () => {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

  };

  const toDutch = () => {
    navigate('/dutch', { state: { selectedRows } });
  };

  return (
    <div>
      <Header />
      <p className={styles.transactionTitle}>거래 상세내역</p>
      <div className={styles.transDiv}>
        <p className={styles.nMent1}>여행메이트와의 정산이 필요한 내역을 체크하고,</p>
        <p className={styles.nMent}>정산 내역보기 버튼을 눌러 공유해보세요</p>
      </div>

      {selectedRowKeys.length > 0 && (
        <FloatButton
          description="정산하기"
          shape="square"
          style={{
            border: '1px solid blue',
            fontFamily: 'preBd',
            width: '8rem',
            height: '3rem',
            right: '35vw',
          }}
          onClick={toDutch}
        />
      )}

      <div className={styles.detailDiv}>
        <Table
          rowSelection={{
            hideSelectAll: true,
            onChange: onSelectChange,
            selectedRowKeys: selectedRowKeys,
          }}
          columns={columns}
          dataSource={data}
          scroll={{ y: '63vh' }}
          pagination={false}
          hideSelectAll={true}
        />
      </div>
    </div>
  );
};

export default TransactionDetail;


// import React from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./TransactionDetail.module.css";
// import Header from "../components/common/Header";
// import { FloatButton, Button, Collapse, Divider, Radio, Table } from 'antd';
// import './Transaction.css'

// // const text = '여행메이트와의 정산이 필요한 내역을 체크하고, \n 정산하기 버튼을 눌러 공유해보세요'

// const columns = [
//   {
//     title: '일시',
//     dataIndex: '일시',
//   },
//   {
//     title: '상세내역',
//     dataIndex: '상세내역',
//   },
//   {
//     title: '금액',
//     dataIndex: '금액',
//   },
// ];
// const data = [
//   {
//     key: '1',
//     일시: '08/24 11:00:12',
//     상세내역: '김밥천국',
//     금액: '11000',
//   },
//   {
//     key: '2',
//     일시: '08/24 11:00:12',
//     상세내역: '스타벅스',
//     금액: '8200',
//   },
  
// ];

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   onSelect : () => {
//     console.log('선택됨선택됨');
//     <FloatButton description="정산하기" shape="square" style={{ border: '1px solid blue', fontFamily:'preBd', width: '8rem', height: '3rem', right: '35vw'}} />
//   },
// };

// const TransactionDetail = () => {
//   const navigate = useNavigate();
//   const check = () => {
//     console.log('선택됨')
//   }

//   const toDutch = () => {
//     navigate('/dutch')
//   }

//   return (
//     <div>
//       <Header/>
//       <p className={styles.transactionTitle}>거래 상세내역</p>
//       <div className={styles.transDiv}>
//         <p className={styles.nMent1}>여행메이트와의 정산이 필요한 내역을 체크하고,</p>
//         <p className={styles.nMent}>정산하기 버튼을 눌러 공유해보세요</p>
//         {/* <Link to="/dutch"><Button style={{fontFamily:"preRg"}}>정산하기</Button></Link> */}
//       </div>

//       {/* <Collapse
//       bordered={false}
//       items={[{ key: '1', label: '정산하기', children: <p>{text}</p> }]}
//       style={{whiteSpace: 'pre-line', fontFamily: 'preRg', marginTop: 0, padding: 0, textAlign:'start'}}
//     /> */}
//     {/* <FloatButton description="정산하기" shape="square" style={{ border: '1px solid blue', fontFamily:'preBd', width: '8rem', height: '3rem', right: '35vw'}} onClick={toDutch} /> */}

//       <div className={styles.detailDiv}>
//         <Table
//           rowSelection={{
//             hideSelectAll: true,
//             backgroundColor: 'white',
//             // style : {{ backgroundColor: 'white' }},
//             ...rowSelection,
//           }}
//           columns={columns}
//           dataSource={data}
//           scroll={{ y: '63vh' }}
//           pagination={false}
//           hideSelectAll={true}
//         />
//       </div>
//     </div>
//   )
// }
 
// export default TransactionDetail
