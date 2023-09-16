import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './DateList.module.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import '../../pages/Transaction.css'

function DateList() {
  const [lastPlan, setLastPlan] = useState(null);
  const data = localStorage.getItem('userNumber');

  const getDates = async () => {
    try {
      const response = await axios.get("/api2/plan", 
        { headers: { "User-Number" : data } });
      const dataBody = response.data.dataBody;

      if (dataBody.length > 0) {
        const lastPlan = dataBody[dataBody.length - 1];
        setLastPlan(lastPlan);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDates();
  }, []);

  const renderDateRange = (startDate, endDate) => {
    const dateArray = [];
    const currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray.map((date, index) => (
      <div key={index}>
        <p className={styles.dateText}>
          {index + 1}일차 [{date.getFullYear()}.
          {date.getMonth() + 1 < 10 ? '0' : ''}{date.getMonth() + 1}.
          {date.getDate() < 10 ? '0' : ''}{date.getDate()}]
        </p>
        <div className={styles.dateItem}>
          
        <Link to={{
          pathname: '/planbudget',
        }}>
          <Button
            size="small"
            style={{ height: '2rem', backgroundColor: '#316FDF', fontFamily: "preRg" }}
            type="primary">예산 추가하기</Button>
        </Link>
        </div>
      </div>
    ));
  }

  return (
    <div>
      {lastPlan ? (
        <div>
          {renderDateRange(lastPlan.startDate, lastPlan.endDate)}
        </div>
      ) : (
        <p>선택된 일정이 없습니다.</p>
      )}
    </div>
  );
}

export default DateList;


// import React, { useEffect, useState } from 'react';
// import CreateBudget from './CreateBudget';
// import axios from 'axios';

// const BudgetList = () => {
//   const [budgetResults, setbudgetResults] = useState([]);
//   const data = localStorage.getItem('userNumber');

//   const getBudgetList = async () => {
//     try {
//       const response = await axios.get("/api2/plan", 
//         { headers: { "User-Number" : data } });
//       // const dataBody = response.data.dataBody;
//         console.log(response.data.data.results);
//       if (response.data.data && response.data.data.results.length > 0) {
//         setbudgetResults(response.data.data.results);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     getBudgetList();
//   }, []);

//   return (
//     <div>
//       <h3>예산 추가</h3>
//         <div></div>
      


//       <CreateBudget />
//     </div>
//   );
// }

// export default BudgetList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './SelectedDate.module.css';
// import { Link, useLocation } from 'react-router-dom';
// import { Button } from 'antd';

// function SelectedDate() {
//   const [lastPlan, setLastPlan] = useState(null);
//   const data = localStorage.getItem('userNumber');
//   const [lastPlanId, setLastPlanId] = useState(null); // 최신 plan_id
//   const location = useLocation();

//   const getDate = async () => {
//     try {
//       const response = await axios.get("/api2/plan", 
//         { headers: { "User-Number" : data } });
//       const dataBody = response.data.dataBody;

//       if (dataBody.length > 0) {
//         const lastPlan = dataBody[dataBody.length - 1];
//         setLastPlan(lastPlan);

//         // 가장 최신의 planId를 가져와 상태에 설정
//         setLastPlanId(lastPlan.planId);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   useEffect(() => {
//     getDate();
//   }, [data]);

//   // 버튼 활성화 조건을 설정합니다.
//   const isButtonDisabled = !lastPlanId || location.pathname == `/plan/${lastPlanId}`;

//   return (
//     <div>
//       <h3>여행 일정</h3>
//       {lastPlan ? (
//         <div className={styles.dateItem}>
//           <p>여행 시작 일자: {lastPlan.startDate}</p>
//           <p>여행 종료 일자: {lastPlan.endDate}</p>
//           <div>
//             {isButtonDisabled ? ( // 버튼을 숨기기 위해 조건부 렌더링 사용
//               null // 버튼을 렌더링하지 않음
//             ) : (
//               <Link to={`/plan/${lastPlanId}`}>
//                 <Button
//                   size="small"
//                   style={{
//                     height: '2rem',
//                     marginTop: '1rem',
//                     backgroundColor: '#316FDF',
//                     fontFamily: "preRg"
//                   }}
//                   type="primary"
//                 >
//                   날짜별로 예산 추가하기
//                 </Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>일정을 선택해주세요.</p>
//       )}
//     </div>
//   );
// }

// export default SelectedDate;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './DateList.module.css';
// import { Button } from 'antd';
// import { Link } from 'react-router-dom';
// import '../../pages/Transaction.css';
// // import { useLocation } from 'react-router-dom';

// function DateList() {
//   const [lastPlan, setLastPlan] = useState(null);
//   const [latestPlanId, setLatestPlanId] = useState(null); // 최신 planId 상태 추가
//   const data = localStorage.getItem('userNumber');

//   useEffect(() => {
//     const getDates = async () => {
//       try {
//         const response = await axios.get("/api2/plan", 
//           { headers: { "User-Number" : data } });
//         const dataBody = response.data.dataBody;
//         console.log(dataBody)

//         if (dataBody.length > 0) {
//           const lastPlan = dataBody[dataBody.length - 1];
//           setLastPlan(lastPlan);

//           // 가장 최신의 planId를 가져와 상태에 설정
//           setLatestPlanId(lastPlan.planId);
          
//           console.log("latestPlanId:", latestPlanId);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     getDates();
//   }, [data]);

//   const renderDateRange = (startDate, endDate) => {
//     const dateArray = [];
//     const currentDate = new Date(startDate);

//     while (currentDate <= new Date(endDate)) {
//       dateArray.push(new Date(currentDate));
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     return dateArray.map((date, index) => {
//       const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
//       console.log("formattedDate:", formattedDate);

//       return (
//         <div key={index}>
//           <p className={styles.dateText}>
//             {index + 1}일차 [{date.getFullYear()}.
//             {date.getMonth() + 1 < 10 ? '0' : ''}{date.getMonth() + 1}.
//             {date.getDate() < 10 ? '0' : ''}{date.getDate()}]
//           </p>
//           <div className={styles.dateItem}>
//             <Link
//               to={{
//                 pathname: `/budget/${latestPlanId}`,
//                 state: {
//                   formattedDate: formattedDate,
//                   latestPlanId: lastPlan.planId,
//                 }
//               }}
//             >
//               <Button
//                 size="small"
//                 style={{ height: '2rem', backgroundColor: '#316FDF', fontFamily: "preRg" }}
//                 type="primary"
//               >
//                 예산 추가하기
//               </Button>
//             </Link>
//           </div>
//         </div>
//       );
//     });
//   }

//   return (
//     <div>
//       {lastPlan ? (
//         <div>
//           {renderDateRange(lastPlan.startDate, lastPlan.endDate)}
//         </div>
//       ) : (
//         <p>선택된 일정이 없습니다.</p>
//       )}
//     </div>
//   );
// }

// export default DateList;

