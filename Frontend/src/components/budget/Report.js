import {React, useState, useEffect, PureComponent } from 'react';
import { PieChart, Tooltip, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./Report.module.css";
import axios from "axios";
import { Button } from 'antd';

const COLORS = ['#ededed','#C1D9F5', '#BBDEFA', '#74AADB', '#6197F4', '#327CDC', '#134DE0'];
const COLORS2 = ['#ededed','#EDB4C6','#BBDEFA', '#74AADB', '#6197F4', '#327CDC', '#134DE0']

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

  const [currentLink, setCurrentLink] = useState("");
  const [day, setDay] = useState(0) // 여행 몇일차
  const [dayAmount, setDayAmount] = useState(0) // 하루 예산 전체 금액
  const [dayAmountUsed, setDayAmountUsed] = useState(0) // 일일 쓴 금액
  const [dayCategory, setDayCategory] = useState([]) // 일일 쓴 카테고리별 퍼센트
  const [totalCategory, setTotalCategory] = useState([]) // 전체 쓴 카테고리별 퍼센트
  const [dayPercent, setDayPercent] = useState(0) // 하루 쓴 금액 비율

  const [dayMeal, setDayMeal] = useState(0)
  const [dayTraffic, setDayTraffic] = useState(0)
  const [daySports, setDaySports] = useState(0)
  const [dayTravel, setDayTravel] = useState(0)
  const [dayLodge, setDayLodge] = useState(0)
  const [dayEtc, setDayEtc] = useState(0)

  const [totalMeal, setTotalMeal] = useState(0)
  const [totalTraffic, setTotalTraffic] = useState(0)
  const [totalSports, setTotalSports] = useState(0)
  const [totalTravel, setTotalTravel] = useState(0)
  const [totalLodge, setTotalLodge] = useState(0)
  const [totalEtc, setTotalEtc] = useState(0)
  
  const [loading, setLoading] = useState(true);
  // const [dayData, setDayData] = useState([])
  // const [totalData, setTotalData] = useState([])
  const [dayData, setDayData] = useState(null);
  const [totalData, setTotalData] = useState(null);

  // 오늘 날짜
  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }

  function formatBalance(balance) {
    return balance.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }


useEffect(() => {
  // 일자별 여행비 분석
  const analyzeBudget = async () => {
    try {
      const requestData = {
        dataBody: { 
          "todayDate" : getFormattedDate(),
        }
      };
      const response = await axios.post(`https://sawsim.site/api/analyze/${planId}`, requestData, { headers: { "User-Number": data } });
      const dataBody = response.data.dataBody.dataBody;
      console.log(dataBody)

      return {
        day: dataBody.day,
        dayAmount: dataBody.dayAmount,
        dayAmountUsed: dataBody.dayAmountUsed,
        dayPercent: parseFloat(dataBody.dayAmountUsed / dataBody.dayAmount * 100).toFixed(1),
        dayTravel: dataBody.dayTravel,
        dayTraffic: dataBody.dayTraffic,
        dayEtc: dataBody.dayEtc,
        dayLodge: dataBody.dayLodge,
        daySports: dataBody.daySports,
        dayMeal: dataBody.dayMeal,
        totalTravel: dataBody.관광지,
        totalTraffic: dataBody['교통,수송'],
        totalEtc: dataBody.기타,
        totalLodge: dataBody.숙박,
        totalSports: dataBody['스포츠,레저'],
        totalMeal: dataBody.음식점,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const fetchDataAndSetState = async () => {
    const result = await analyzeBudget();
    if (result) {
      setDay(result.day);
      setDayAmount(result.dayAmount);
      setDayAmountUsed(result.dayAmountUsed);
      setDayCategory(result.dayCategory);
      setTotalCategory(result.totalCategory);
      setDayPercent(result.dayPercent);
      setDayTravel(result.dayTravel);
      setDayTraffic(result.dayTraffic);
      setDayEtc(result.dayEtc);
      setDayLodge(result.dayLodge);
      setDaySports(result.daySports);
      setDayMeal(result.dayMeal);
      setLoading(false);
      setTotalTravel(result.totalTravel)
      setTotalTraffic(result.totalTraffic)
      setTotalEtc(result.totalEtc)
      setTotalLodge(result.totalLodge)
      setTotalSports(result.totalSports)
      setTotalMeal(result.totalMeal)
    }
  };

  fetchDataAndSetState();
}, [planId, data]);



  const dayGraph = [
    { name: '전체', value: 100 },
    { name: '관광지', value: parseFloat(dayTravel.toFixed(2)) },
    { name: '스포츠,레저', value: parseFloat(daySports.toFixed(2)) },
    { name: '숙박', value: parseFloat(dayLodge.toFixed(2)) },
    { name: '기타', value: parseFloat(dayEtc.toFixed(2)) },
    { name: '교통,수송', value: parseFloat(dayTraffic.toFixed(2)) },
    { name: '음식점', value: parseFloat(dayMeal.toFixed(2)) },
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
    { name: '관광지', value: totalTravel },
    { name: '스포츠,레저', value: totalSports },
    { name: '숙박', value: totalLodge },
    { name: '기타', value: totalEtc },
    { name: '교통,수송', value: totalTraffic },
    { name: '음식점', value: totalMeal },
  ];
  console.log(totalTravel)
  console.log(totalLodge)
  const totalGraphDataWithoutTotal = totalGraph.filter(item => item.name !== '전체');
  const totalSortedGraphDataWithoutTotal = totalGraphDataWithoutTotal.sort((a, b) => a.value - b.value);
  const ttotalItem = totalGraph.find(item => item.name === '전체');
  totalSortedGraphDataWithoutTotal.unshift(ttotalItem);


  useEffect(() => {

    const currentPath = window.location.pathname;
    setCurrentLink(currentPath);

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
  }, [dayMeal]);

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
      <p className={styles.ment}>오늘 예산의 <span className={styles.money1}>{dayPercent}%</span>인 <span className={styles.money}>{formatBalance(dayAmountUsed)}원</span>을 사용했어요.</p>   
    </div>

    <div style={{display:'flex',justifyContent:'space-around', padding:'0 0.5rem'}}>
      <p style={{marginBottom:0}}>일일 예산</p>
      <p style={{marginBottom:0}}>전체 예산</p>
    </div>
    


    
    {daySortedGraphDataWithoutTotal !=null && totalSortedGraphDataWithoutTotal !=null ? (
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
    ) : (
      // console.log('아직 로딩안돼써')
      <p>Loading...</p>
    )}
    


      <Link to={{ pathname: "/cash", state: { currentLink } }}>
        <Button style={{paddingTop:'0.3rem',color:'#316FDF', border:'1px solid #316FDF', fontFamily:"preBd", marginRight:'1rem'}}>현금 기록하기</Button>
      </Link>
      <Link to={{ pathname: "/transaction", state: { currentLink } }}><Button style={{paddingTop:'0.3rem',color:'#316FDF', border:'1px solid #316FDF', fontFamily:"preBd"}}>내역 상세보기</Button></Link>
  </div>
  );
};
// }
export default Report;
