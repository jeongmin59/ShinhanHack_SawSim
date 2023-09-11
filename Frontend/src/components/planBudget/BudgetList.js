import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import axios from 'axios';

const BudgetList = () => {
  const [budgetResults, setbudgetResults] = useState([]);
  const data = localStorage.getItem('userNumber');

  const getBudgetList = async () => {
    try {
      const response = await axios.get("/api2/plan", 
        { headers: { "User-Number" : data } });
      // const dataBody = response.data.dataBody;
        console.log(response.data.data.results);
      if (response.data.data && response.data.data.results.length > 0) {
        setbudgetResults(response.data.data.results);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBudgetList();
  }, []);

  return (
    <div>
      <h3>예산 추가</h3>
        <div></div>
      


      <CreateBudget />
    </div>
  );
}

export default BudgetList;
