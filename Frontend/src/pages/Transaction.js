import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Transaction.module.css';
import Header from '../components/common/Header';
import { FloatButton, Button, Collapse, Divider, Radio, Table, Tag } from 'antd';
import './Transaction.css';

// 페이지 접속 시 거래내역조회(신한 api) + 거래내역 확인시간 조회(백 api)
// 거래내역조회(신한)의 거래일자시간과 최신 거래내역 확인시간(백) 비교
// 거래내역조회(신한)의 거래내역 중 여행시작날짜 이후 + 적요 2(출금)이면서
// 거래내역 확인시간(백)보다 거래일자시간(신한)이 나중인것
// 즉 거래일자시간(신한) > 거래내역 확인시간(백)인 애들만
// 새롭게 json 파일로 만들어서 사용내역저장(백)에 post 요청을 보냄
// 본문에 띄우는 건 사용내역조회(백)
// 추가작업 : 금액 콤마, 상세내역 길어지면 ... 처리

// 상세보기 메모
// 입력 후 확인 누르면 메모 적은 것 content에 넣어서 사용내역저장(백)에 post 요청
// 상세보기에 띄우는 건 일자, 금액, 내역, 메모, 현금/카드(추가)

const columns = [
  {
    title: '일시',
    dataIndex: '일시',
    width: '20%',
    // render: (text) => <a className={styles.time}>{text}</a>,
    render: (text) => (
      <Link to='/transaction/detail' className={styles.time}><div dangerouslySetInnerHTML={{ __html: text.replace(' ', '<br/>') }} /></Link>
    ),
  },
  {
    title: '상세내역',
    dataIndex: '상세내역',
    width: '36%',
    render: (text) => (
      <Link to='/transaction/detail' className={styles.time}>{text}</Link>
    ),    
  },
  {
    title: '금액',
    dataIndex: '금액',
    render: (text) => (
      <Link to='/transaction/detail' className={styles.time}>{text}</Link>
    ),  
    // width: '30%',
  },
  {
    title: '구분',
    dataIndex: '구분',
    render: (tag) => (
      tag === '카드' ? 
        <Tag color="blue" style={{marginRight:0}} key={tag}>{tag}</Tag> :
        <Tag color="purple" style={{marginRight:0}} key={tag}>{tag}</Tag>
    ),
    width: '15%',
  },
];

const data = [
  {
    key: '1',
    일시: '08/24 11:00:12',
    상세내역: '김밥천국 신촌점',
    금액: '11,000',
    구분: '카드',
  },
  {
    key: '2',
    일시: '08/24 11:00:12',
    상세내역: '스타벅스 독립문점',
    금액: '8200',
    구분: '현금'
  },
  {
    key: '3',
    일시: '08/24 11:00:12',
    상세내역: '김밥천국',
    금액: '1,100,000',
    구분: '현금'
  },
  {
    key: '4',
    일시: '08/24 11:00:12',
    상세내역: '스타벅스',
    금액: '8200',
    구분: '카드',
  },
  {
    key: '5',
    일시: '08/24 11:00:12',
    상세내역: '김밥천국',
    금액: '11000',
    구분: '현금'
  },
  {
    key: '6',
    일시: '08/24 11:00:12',
    상세내역: '스타벅스스타벅스스타벅스',
    금액: '110,000',
    구분: '카드',
  },
  {
    key: '7',
    일시: '08/24 11:00:12',
    상세내역: '김밥천국',
    금액: '11000',
    구분: '현금'
  },
  {
    key: '8',
    일시: '08/24 11:00:12',
    상세내역: '스타벅스',
    금액: '8200',
    구분: ['현금']
  },
];

const Transaction = () => {
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

  const check = () => {
    console.log('눌림')
  }

  return (
    <div>
      <Header />
      <div className={styles.titles}>
        <Link className={styles.backLink} to='/budget'><p className={styles.toBack}>&lt;</p>
        <p className={styles.transactionTitle}>거래 상세내역</p></Link> 
      </div>
      <div className={styles.transDiv}>
        <p className={styles.nMent1}>여행메이트와의 정산이 필요한 내역을 체크하고,</p>
        <p className={styles.nMent}>정산 내역보기 버튼을 눌러 공유해보세요</p>
      </div>

      {selectedRowKeys.length > 0 && (
        <FloatButton
          description="정산하기"
          shape="square"
          style={{
            border: '1px solid #316FDF',
            fontFamily: 'preBd',
            width: '8rem',
            height: '2.8rem',
            right: '35vw',
          }}
          onClick={toDutch}
        />
      )}

      <div className={styles.detailDiv}>
        <Table
          style={{backgroundColor:'#F4F5FA', background:'#F4F5FA'}}
          rowSelection={{
            hideSelectAll: true,
            onChange: onSelectChange,
            selectedRowKeys: selectedRowKeys,
          }}
          columns={columns}
          dataSource={data}
          scroll={{ y: '65vh' }}
          pagination={false}
          hideSelectAll={true}
          onClick={check}
        />
      </div>
    </div>
  );
};

export default Transaction;


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
