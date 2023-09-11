import {React, useState, useEffect} from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./Popular.module.css";
import axios from "axios";
import location from "../../assets/location.png"

const Report = () => {
  const [popular, setPopular] = useState([]);

    // 인기장소 조회
    const getPopular = async () => {
      try {
        const response = await axios.get("/api2/popular");
        console.log(response)
        console.log(response.data.dataBody.popularPlaces)
        setPopular(response.data.dataBody.popularPlaces.slice(0, 3))
      } catch (error) {
        console.error(error);
      }
    }

  useEffect(() => {
    getPopular();
  }, []);

  return (
  <div style={{margin:'1rem', backgroundColor:'#316FDF',
  display:'flex',justifyContent:'space-around',
  borderRadius:'1.2rem', padding:'1.3rem 1rem'}}>
    <div style={{marginLeft:'0.4rem'}} >
      <p style={{opacity:'0.8',fontSize:'0.9rem',color:'#FFF',fontFamily:'preLt',marginTop:0,marginBottom:'0.3rem',textAlign:'start'}}>놀면 뭐하니?</p>
      <p style={{color:'white',fontSize:'1.1rem',fontFamily:'preBd',margin:'0 0 1.2rem 0',textAlign:'start'}}>지금 인기있는 장소는?</p>
      <Link to='/popular' style={{color: 'white',textDecoration:'none'}}>
        <button style={{paddingTop:'0.2rem',paddingBottom:'0.2rem',marginBottom:'0.5rem', color: 'white', border:'0.02rem solid white',borderRadius:'0.4rem',
        display:'flex',margin: 0, textDecoration:'none'}} className={styles.more}>보러가기 &gt; 
        </button></Link>
    </div>
    <img style={{margin:'0.5rem 0 0 2rem', alignItems:'center',width:'5rem', height:'4.7rem'}} src={location} alt="png"/>

    {/* <div className={styles.popularTitles}>
      <p className={styles.popularTitle}>지금 인기있는 장소는?</p>
      <Link to='/popular'><button className={styles.more}>더보기</button></Link>
    </div>

    <div style={{ padding:'0 0.5rem',marginTop: '1rem', display: 'flex', flexWrap: 'wrap' }}>
    {popular.map((item, index) => (
    <div style={{ width: '33%'}}>
      <a href={`https://www.google.com/search?q=${item.store}&oq=${item.store}&aqs=edge..69i57.1023j0j4&sourceid=chrome&ie=UTF-8`} target="_blank" rel="noopener noreferrer">
      <img loading="lazy" className={styles.img} src={item.img} alt="img"/></a>
      <p className={styles.store}>{item.store}</p>
    </div>
    ))}
    </div> */}
  </div>
  );
};

export default Report;
