import {React, useState, useEffect, PureComponent } from 'react';
import { PieChart, Tooltip, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./Report.module.css";
import axios from "axios";
import { Button } from 'antd';

const graphData = [
  { name: '전체', value: 100 },
  { name: '여행', value: 3 },
  { name: '기타', value: 3 },
  { name: '스포츠,레저', value: 5 },
  { name: '교통,수송', value: 8 },
  { name: '음식점', value: 12 },
  { name: '의료,건강', value: 15 },
];

const allData = [
  { name: '전체', value: 100 },
  { name: '오늘', value: 18 },
];

const COLORS = ['#ededed','#C1D9F5', '#BBDEFA', '#74AADB', '#6197F4', '#327CDC', '#134DE0'];
const COLORS2 = ['#ededed','#EDB4C6']

const Report = () => {
  // const data = useLocation().state?.userNumber;
  const data = localStorage.getItem('userNumber');
  const name = localStorage.getItem('userName');

  const [day, setDay] = useState("")
  const [totalBudget, setTotalBudget] = useState("")
  const [amount, setAmount] = useState("")

  // 오늘 날짜
  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }
  
  const plan_id = 3

  // 일자별 여행비 분석
  const analyzeBudget = async () => {
    try {
      const requestData = {
        dataBody: { 
          "todayDate" : getFormattedDate(),
        }
      };
      const response = await axios.post(`/api2/analyze/${plan_id}`, requestData, { headers: { "User-Number": data } });
      console.log(response.data)
      console.log(response.data.dataBody.day) // 여행 몇일차
      setDay()
      console.log(response.data.dataBody.totalBudget) // 전체에서 사용 비율
      setTotalBudget()
      console.log(response.data.dataBody.amountUsed) // 사용한 총액
      setAmount()
      console.log(response.data.dataBody.category) // 사용한 카테고리별 비율
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(data)
    console.log(getFormattedDate())
    analyzeBudget()
  }, [data]);


  return (
  <div>
    <div className={styles.titles}>
      <Link className={styles.backLink} to='/main'><p className={styles.toBack}>&lt;</p>
      <p className={styles.tripCalendarTitle}>예산 실시간 분석</p></Link>
    </div>
    <br/>
    <div className={styles.calendarDiv}>
      {/* <p className={styles.ment}>{name}님의 여행 {day}일차</p> */}
      <p className={styles.ment}>{name}님의 <span className={styles.day}>여행 3일차</span></p>
      {/* <p className={styles.ment}>오늘 예산의 {totalBudget}%인 {amount}원을 사용했습니다.</p> */}
      <p className={styles.ment}>오늘 예산의 <span className={styles.money1}>75%</span>인 <span className={styles.money}>340,120원</span>을 사용했어요.</p>
      
    </div>

    <div style={{display:'flex',justifyContent:'space-around', padding:'0 0.5rem'}}>
      <p style={{marginBottom:0}}>일일 예산</p>
      <p style={{marginBottom:0}}>전체 예산</p>
    </div>

    <PieChart width={350} height={200}>
        <Pie
          startAngle={-270}
          data={graphData}
          cx={90}
          cy={90}
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {graphData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        
        <Pie
          startAngle={-270}
          data={allData}
          cx={260}
          cy={90}
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {allData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <Link to="/cash">
        <Button style={{color:'#316FDF', border:'1px solid #316FDF', fontFamily:"preBd", marginRight:'1rem'}}>현금 기록하기</Button>
      </Link>
      <Link to="/transaction"><Button style={{color:'#316FDF', border:'1px solid #316FDF', fontFamily:"preBd"}}>내역 상세보기</Button></Link>
  </div>
  );
};

export default Report;
