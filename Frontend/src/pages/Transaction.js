import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Transaction.module.css';
import Header from '../components/common/Header';
import { Alert, Space, FloatButton, Button, Collapse, Divider, Radio, Table, Tag } from 'antd';
import './Transaction.css';
import axios from "axios";

// 페이지 접속 시 거래내역조회(신한 api) + 거래내역 확인시간 조회(백 api)
// 거래내역조회(신한)의 거래일자시간과 최신 거래내역 확인시간(백) 비교
// 거래내역조회(신한)의 거래내역 중 여행시작날짜 이후 + 적요 2(출금)이면서
// 거래내역 확인시간(백)보다 거래일자시간(신한)이 나중인것
// 즉 거래일자시간(신한) > 거래내역 확인시간(백)인 애들만
// 새롭게 json 파일로 만들어서 사용내역저장(백)에 post 요청을 보냄

// 이건 함
// 본문에 띄우는 건 사용내역조회(백)
// 추가작업 : 금액 콤마, 상세내역 길어지면 ... 처리

// 상세보기 메모
// 입력 후 확인 누르면 메모 적은 것 content에 넣어서 사용내역저장(백)에 post 요청
// 상세보기에 띄우는 건 일자, 금액, 내역, 메모, 현금/카드(추가)

// const data = [
//   {
//     key: '1',
//     일시: '08/24 11:00:12',
//     상세내역: '김밥천국 신촌점',
//     금액: '11,000',
//     구분: '카드',
//   },
//   {
//     key: '2',
//     일시: '08/24 11:00:12',
//     상세내역: '스타벅스 독립문점',
//     금액: '8200',
//     구분: '현금'
//   },
//   {
//     key: '3',
//     일시: '08/24 11:00:12',
//     상세내역: '김밥천국',
//     금액: '1,100,000',
//     구분: '현금'
//   },
//   {
//     key: '4',
//     일시: '08/24 11:00:12',
//     상세내역: '스타벅스',
//     금액: '8200',
//     구분: '카드',
//   },
//   {
//     key: '5',
//     일시: '08/24 11:00:12',
//     상세내역: '김밥천국',
//     금액: '11000',
//     구분: '현금'
//   },
//   {
//     key: '6',
//     일시: '08/24 11:00:12',
//     상세내역: '스타벅스스타벅스스타벅스',
//     금액: '110,000',
//     구분: '카드',
//   },
//   {
//     key: '7',
//     일시: '08/24 11:00:12',
//     상세내역: '김밥천국',
//     금액: '11000',
//     구분: '현금'
//   },
//   {
//     key: '8',
//     일시: '08/24 11:00:12',
//     상세내역: '스타벅스',
//     금액: '8200',
//     구분: ['현금']
//   },
// ];

const columns = [
  {
    title: '일시',
    dataIndex: '일시',
    width: '20%',
    render: (text) => <p style={{fontFamily:'preLt', margin:0}}>{text}</p>,
  },
  {
    title: '상세내역',
    dataIndex: '상세내역',
    width: '36%',   
  },
  {
    title: '금액',
    dataIndex: '금액',
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


const Transaction = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await getCheckLatest();
  //   };
  //   fetchData();
  // }, []);

  const account = sessionStorage.getItem('account');
  const userNumber = localStorage.getItem('userNumber');
  const navigate = useNavigate();
  const [shTransactions, setShTransactions] = useState([]); // 신한 거래내역조회
  const [checklatest, setChecklatest] = useState(''); // 최신 거래내역 확인시간
  // const [newlyAdded, setNewlyAdded] = useState([]) // 새로 추가할 배열
  // 이걸 백에 post 보내고나면
  const [allTransactions, setAllTransactions] = useState([]); // 표에 띄울 전체 거래내역
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // 1. 페이지 접속 시 거래내역조회(신한 api) - useEffect는 이거 하나만 넣고 안에서 모든걸 해결
  const getSHTransactions = async () => {
    try {
      const requestData = {
        dataHeader: {
          apikey: "2023_Shinhan_SSAFY_Hackathon",
        },
        dataBody: {
          계좌번호: account,
        },
      };
      const response = await axios.post("https://sawsim.site/api/v1/search/transaction", requestData);
      console.log(response.data)
      console.log(response.data.dataBody.거래내역)
      await setShTransactions(response.data.dataBody.거래내역)
      if (shTransactions) {
        console.log('신한',shTransactions)
        await getCheckLatest()
      }
      // await console.log('신한',shTransactions)
    } catch (error) {
      console.error(error);
    }
  }

  function changeDateToBackDB(dateString) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    const formattedDateString = `${year}-${month}-${day}`;
    return formattedDateString
  }

  const changeTimeToBackDB = (time) => {
    const timeString = time.toString();
    const hours = timeString.substring(0, 2);
    const minutes = timeString.substring(2, 4);
    const seconds = timeString.substring(4,6);
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
  }
  
  // 2. 최신 거래내역 확인시간 조회(백 api)
  // 이걸 getSHTransactions 함수 then에 넣어야함
  const getCheckLatest = async () => {
    try {
      const response = await axios.get("https://sawsim.site/api/transactions/latest-date", { headers: { "User-Number": userNumber } });
      console.log(response)
      console.log(response.data.dataBody)
      console.log('두번째',shTransactions)
      if (response.data.dataBody === null) {
        console.log(shTransactions)
        const newlyAdded = shTransactions.map(item => ({
          transactionDate: changeDateToBackDB(item.거래일자),
          transactionTime: changeTimeToBackDB(item.거래시간),
          amount: item.출금금액,
          content: "",
          storeName: item.내용,
          paymentType: "CARD"
        }))
        console.log('보내는 내용',newlyAdded)
        
        try {
          const requestData = {
            dataBody: { 
              transactionHistory: newlyAdded
            }
          };
          console.log('데이터바디췤',requestData)
          const response = await axios.post("https://sawsim.site/api/transactions", requestData, { headers: { "User-Number": userNumber } });
          console.log(response)
          // 이후, 전체 거래내역을 다시 가져오는 함수 실행
          await getTransactions();
        } catch (error) {
          console.error("거래내역 저장에 실패했습니다.", error);
        }
      } 
      else {
        console.log('최신확인시간',response.data.dataBody.transactionDate, response.data.dataBody.transactionTime)
        const latestDatePlusTime = `${response.data.dataBody.transactionDate}${response.data.dataBody.transactionTime}`
        setChecklatest(latestDatePlusTime) // 날짜시간 합친상태로 들어감
        console.log(latestDatePlusTime)
        filterNewTransactions()
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 3. 이제 신한 거래내역들중에 filter 걸어서 거래일자/시간이 checklatest보다 큰 애들만
  // newlyAdded 배열로 저장하고 백 사용내역저장 post 요청 보내기
  // then, getTransactions 실행
  // --------------------------------------
  // 이걸 getCheckLatest에 넣어야함
  const filterNewTransactions = async () => {
    // 최신 거래내역 확인시간(checklatest)과 비교할 함수
    const isTransactionNewerThanCheckLatest = (shTransactions) => {
      // 거래일자와 거래시간을 합쳐서 확인시간과 비교
      const shDatePlusTime = `${shTransactions.거래일자}${shTransactions.거래시간}`;
      return shDatePlusTime > checklatest;
    };
    // 최신 거래내역 확인시간과 비교하여 새로운 거래내역 필터링
    const newlyAddedItems = shTransactions.filter(isTransactionNewerThanCheckLatest);
    const newlyAdded = newlyAddedItems.map(item => ({
      transactionDate: changeDateToBackDB(item.거래일자),
      transactionTime: changeTimeToBackDB(item.거래시간),
      amount: item.출금금액,
      content: "",
      storeName: item.내용,
      paymentType: "CARD"
    }))
    // 필터링된 거래내역을 사용내역 저장(백)에 POST 요청
    try {
      const requestData = {
        dataBody: { 
          transactionHistory: newlyAdded
        }
      };
      const response = await axios.post("https://sawsim.site/api/transactions", requestData, { headers: { "User-Number": userNumber } });
      console.log(response.data)
      if (response.data.dataHeader.successCode === '0') {
        window.alert('새로운 거래내역이 성공적으로 저장되었습니다.')
      }
      // 이후, 전체 거래내역을 다시 가져오는 함수 실행
      await getTransactions();
    } catch (error) {
      console.error("거래내역 저장에 실패했습니다.", error);
    }
  };

  // 최종 테이블에 실리는 백 데이터 get
  const getTransactions = async () => {
    try {
      const response = await axios.get("https://sawsim.site/api/transactions", { headers: { "User-Number": userNumber } });
      console.log(response.data)  
      setAllTransactions(response.data.dataBody)
      console.log(allTransactions)
    } catch (error) {
      console.error(error);
    }
  } // 배열돌면서 띄움
  const data = allTransactions.map(item => ({
    key: item.id,
    일시: `${item.transactionDate}\n${item.transactionTime}`,
    상세내역: item.storeName,
    금액: item.amount,
    구분: item.paymentType
  }));


  useEffect(() => {
    // getCheckLatest();
    getSHTransactions();
    // getTransactions();
  }, []);

  // useEffect(() => {
  //   if (shTransactions.length > 0) {
  //     getCheckLatest();
  //   }
  // }, [shTransactions]);

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
      <div className={styles.titles}>
        <Link className={styles.backLink} to='/budget'><p className={styles.toBack}>&lt;</p>
        <p className={styles.transactionTitle}>거래 내역</p></Link> 
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

      <div style={{ marginTop: '0.1rem' }}>
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
          // onClick={check}
          onRow={(record) => ({
            onClick: () => {
              setSelectedTransaction(record);
              navigate('/transaction/detail', { state: { selectedRow: record } });
            },
          })}
        />
      </div>
    </div>
  );
};

export default Transaction;