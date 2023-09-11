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
