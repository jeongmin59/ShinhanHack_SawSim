import {React, useState, useEffect} from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./Popular.module.css";
import axios from "axios";

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
  <div>
    <div className={styles.popularTitles}>
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
    </div>
  </div>
  );
};

export default Report;
