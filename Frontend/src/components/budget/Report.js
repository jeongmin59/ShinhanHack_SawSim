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

  const [day, setDay] = useState(0) // 여행 몇일차
  const [dayAmount, setDayAmount] = useState(0) // 하루 예산 전체 금액
  const [dayAmountUsed, setDayAmountUsed] = useState(0) // 일일 쓴 금액
  const [dayCategory, setDayCategory] = useState([]) // 일일 쓴 카테고리별 퍼센트
  const [totalCategory, setTotalCategory] = useState([]) // 전체 쓴 카테고리별 퍼센트
  const [dayPercent, setDayPercent] = useState(0) // 하루 쓴 금액 비율

  const [dayFood, setDayFood] = useState(0)
  const [dayTransport, setDayTransport] = useState(0)
  const [daySport, setDaySport] = useState(0)
  const [dayTour, setDayTour] = useState(0)
  const [dayAccom, setDayAccom] = useState(0)
  const [dayEtc, setDayEtc] = useState(0)

  const [totalFood, setTotalFood] = useState(0)
  const [totalTransport, setTotalTransport] = useState(0)
  const [totalSport, setTotalSport] = useState(0)
  const [totalTour, setTotalTour] = useState(0)
  const [totalAccom, setTotalAccom] = useState(0)
  const [totalEtc, setTotalEtc] = useState(0)
  

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
      console.log(response.data)
      console.log(response.data.dataBody)
      const dataBody = response.data.dataBody.dataBody

      console.log(dataBody.day) // 여행 몇일차
      setDay(dataBody.day)
      console.log(dataBody.dayAmount) // 하루 예산 전체 금액
      setDayAmount(dataBody.dayAmount)
      console.log(dataBody.dayAmountUsed) // 하루 사용 금액
      setDayAmountUsed(dataBody.dayAmountUsed)
      setDayCategory(dataBody.dayCategory) // 일일 카테고리별 비율
      setTotalCategory(dataBody.totalCategory) // 전체 카테고리별 비율
      
      setDayPercent( dayAmountUsed / dayAmount ) // 일일 몇 % 썼는지
      
      if (dataBody.dayCategory[0] !== undefined) {
      setDayTour(parseFloat(dataBody.dayCategory[0].toFixed(2)));
      setDayTransport(parseFloat(dataBody.dayCategory[1].toFixed(2)));
      setDayEtc(parseFloat(dataBody.dayCategory[2].toFixed(2)));
      setDayAccom(parseFloat(dataBody.dayCategory[3].toFixed(2)));
      setDaySport(parseFloat(dataBody.dayCategory[4].toFixed(2)));
      setDayFood(parseFloat(dataBody.dayCategory[5].toFixed(2)));
      }
      if (dataBody.totalCategory[0] !== undefined) {
        setTotalTour(parseFloat(dataBody.totalCategory[0].toFixed(2)));
        setTotalTransport(parseFloat(dataBody.totalCategory[1].toFixed(2)));
        setTotalEtc(parseFloat(dataBody.totalCategory[2].toFixed(2)));
        setTotalAccom(parseFloat(dataBody.totalCategory[3].toFixed(2)));
        setTotalSport(parseFloat(dataBody.totalCategory[4].toFixed(2)));
        setTotalFood(parseFloat(dataBody.totalCategory[5].toFixed(2)));
      }

    setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const dayGraph = [
    { name: '전체', value: 100 },
    { name: '관광지', value: dayTour },
    { name: '스포츠,레저', value: daySport },
    { name: '숙박', value: dayAccom },
    { name: '기타', value: dayEtc },
    { name: '교통,수송', value: dayTransport },
    { name: '음식점', value: dayFood },
  ];
  // '전체' 항목을 제외한 새로운 배열 생성
  const graphDataWithoutTotal = dayGraph.filter(item => item.name !== '전체');
  // 새로운 배열 정렬
  const daySortedGraphDataWithoutTotal = graphDataWithoutTotal.sort((a, b) => a.value - b.value);
  // '전체' 항목 찾기
  const totalItem = dayGraph.find(item => item.name === '전체');
  // 정렬된 배열의 맨 앞에 '전체' 항목 추가
  daySortedGraphDataWithoutTotal.unshift(totalItem);


  const totalGraph = [
    { name: '전체', value: 100 },
    { name: '관광지', value: totalTour },
    { name: '스포츠,레저', value: totalSport },
    { name: '숙박', value: totalAccom },
    { name: '기타', value: totalEtc },
    { name: '교통,수송', value: totalTransport },
    { name: '음식점', value: totalFood },
  ];
  // '전체' 항목을 제외한 새로운 배열 생성
  const totalGraphDataWithoutTotal = totalGraph.filter(item => item.name !== '전체');
  // 새로운 배열 정렬
  const totalSortedGraphDataWithoutTotal = totalGraphDataWithoutTotal.sort((a, b) => a.value - b.value);
  // '전체' 항목 찾기
  const ttotalItem = totalGraph.find(item => item.name === '전체');
  // 정렬된 배열의 맨 앞에 '전체' 항목 추가
  totalSortedGraphDataWithoutTotal.unshift(ttotalItem);

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

  // if (loading) { // 만약 loading 중이라면,
  //   return <div>Loading...</div>; // 혹은 다른 로딩 화면 컴포넌트
  // } else {
  return (
  <div>
    <div className={styles.titles}>
      <Link className={styles.backLink} to='/main'><p className={styles.toBack}>&lt;</p>
      <p className={styles.tripCalendarTitle}>실시간 예산 분석</p></Link>
    </div>
    <br/>
    
    <div className={styles.calendarDiv}>
      <p className={styles.ment}>{name}님의 <span className={styles.day}>여행 {day}일차</span></p>
      {/* <p className={styles.ment}>오늘 예산의 <span className={styles.money1}>{totalBudget}%</span>인 <span className={styles.money}>{amountUsed}원</span>을 사용했어요.</p>    */}
    </div>

    <div style={{display:'flex',justifyContent:'space-around', padding:'0 0.5rem'}}>
      <p style={{marginBottom:0}}>일일 예산</p>
      <p style={{marginBottom:0}}>전체 예산</p>
    </div>

    <PieChart width={dimensions.width} height={200}>
        <Pie
          startAngle={-270}
          data={daySortedGraphDataWithoutTotal}
          cx={dimensions.width / 4}
          cy={90}
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {daySortedGraphDataWithoutTotal.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        
        <Pie
          startAngle={-270}
          data={totalSortedGraphDataWithoutTotal}
          cx={dimensions.width / 4 * 2.9}
          cy={90}
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {totalSortedGraphDataWithoutTotal.map((entry, index) => (
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
};
// }
export default Report;
