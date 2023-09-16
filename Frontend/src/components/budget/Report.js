import {React, useState, useEffect, PureComponent } from 'react';
import { PieChart, Tooltip, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./Report.module.css";
import axios from "axios";
import { Button } from 'antd';



const COLORS = ['#ededed','#C1D9F5', '#BBDEFA', '#74AADB', '#6197F4', '#327CDC', '#134DE0'];
const COLORS2 = ['#ededed','#EDB4C6']

const Report = () => {
  // const data = useLocation().state?.userNumber;
  const data = localStorage.getItem('userNumber');
  const name = localStorage.getItem('userName');
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get('planId');
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: 200
  });

  const [day, setDay] = useState(0)
  const [totalBudget, setTotalBudget] = useState(0)
  const [amountUsed, setAmountUsed] = useState(0)
  const [food, setFood] = useState(0)
  const [transport, setTransport] = useState(0)
  const [sport, setSport] = useState(0)
  const [tour, setTour] = useState(0)
  const [accom, setAccom] = useState(0)
  const [etc, setEtc] = useState(0)
  const [loading, setLoading] = useState(true);

  // 오늘 날짜
  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }

  // 일자별 여행비 분석
  const analyzeBudget = async () => {
    try {
      const requestData = {
        dataBody: { 
          "todayDate" : getFormattedDate(),
        }
      };
      const response = await axios.post(`https://sawsim.site/api/analyze/${planId}`, requestData, { headers: { "User-Number": data } });
      console.log(response.data.dataBody)
      const dataBody = response.data.dataBody
      console.log(dataBody.dataBody.day) // 여행 몇일차
      setDay(dataBody.dataBody.day)
      console.log(dataBody.dataBody.totalBudget) // 전체에서 사용 비율
      setTotalBudget(dataBody.dataBody.totalBudget)
      console.log(dataBody.dataBody.amountUsed) // 사용한 총액
      setAmountUsed(dataBody.dataBody.amountUsed)
      setFood(parseFloat(dataBody.dataBody[3].toFixed(2)));
      setTransport(parseFloat(dataBody.dataBody[4].toFixed(2)));
      setSport(parseFloat(dataBody.data.body[5].toFixed(2)));
      setTour(parseFloat(data.Body.data.body[6].toFixed(2)));
      setAccom(parseFloat(data.Body.data.body[7].toFixed(2)));
      setEtc(parseFloat(data.Body.data.body[8].toFixed(2)));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const graphData = [
    { name: '전체', value: 100 },
    { name: '관광지', value: tour },
    { name: '스포츠,레저', value: sport },
    { name: '숙박', value: accom },
    { name: '기타', value: etc },
    { name: '교통,수송', value: transport },
    { name: '음식점', value: food },
  ];

  // const sortedGraphData = graphData.sort((a, b) => a.value - b.value);

  // '전체' 항목을 제외한 새로운 배열 생성
  const graphDataWithoutTotal = graphData.filter(item => item.name !== '전체');

  // 새로운 배열 정렬
  const sortedGraphDataWithoutTotal = graphDataWithoutTotal.sort((a, b) => a.value - b.value);

  // '전체' 항목 찾기
  const totalItem = graphData.find(item => item.name === '전체');

  // 정렬된 배열의 맨 앞에 '전체' 항목 추가
  sortedGraphDataWithoutTotal.unshift(totalItem);

  const allData = [
    { name: '전체', value: 100 - totalBudget },
    { name: '오늘', value: totalBudget },
  ];

  useEffect(() => {
    console.log(data)
    console.log(getFormattedDate())
    analyzeBudget()

    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: 200
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  if (loading) { // 만약 loading 중이라면,
    return <div>Loading...</div>; // 혹은 다른 로딩 화면 컴포넌트
  } else {
  return (
  <div>
    <div className={styles.titles}>
      <Link className={styles.backLink} to='/main'><p className={styles.toBack}>&lt;</p>
      <p className={styles.tripCalendarTitle}>실시간 예산 분석</p></Link>
    </div>
    <br/>
    <div className={styles.calendarDiv}>
      <p className={styles.ment}>{name}님의 <span className={styles.day}>여행 {day}일차</span></p>
      <p className={styles.ment}>오늘 예산의 <span className={styles.money1}>{totalBudget}%</span>인 <span className={styles.money}>{amountUsed}원</span>을 사용했어요.</p>   
    </div>

    <div style={{display:'flex',justifyContent:'space-around', padding:'0 0.5rem'}}>
      <p style={{marginBottom:0}}>일일 예산</p>
      <p style={{marginBottom:0}}>전체 예산</p>
    </div>

    <PieChart width={dimensions.width} height={200}>
        <Pie
          startAngle={-270}
          data={sortedGraphDataWithoutTotal}
          cx={dimensions.width / 4}
          cy={90}
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {sortedGraphDataWithoutTotal.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        
        <Pie
          startAngle={-270}
          data={allData}
          cx={dimensions.width / 4 * 2.9}
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
        <Button style={{paddingTop:'0.3rem',color:'#316FDF', border:'1px solid #316FDF', fontFamily:"preBd", marginRight:'1rem'}}>현금 기록하기</Button>
      </Link>
      <Link to="/transaction"><Button style={{paddingTop:'0.3rem',color:'#316FDF', border:'1px solid #316FDF', fontFamily:"preBd"}}>내역 상세보기</Button></Link>
  </div>
  );
};}

export default Report;
