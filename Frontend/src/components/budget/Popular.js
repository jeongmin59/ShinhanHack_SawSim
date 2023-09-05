import {React, useState, useEffect} from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./Popular.module.css";
import axios from "axios";

const Report = () => {
  const [popular, setPopular] = useState([]);

    // 인기장소 조회
    const getPopular = async () => {
      try {
        const response = await axios.get("/api2/v1/popular_places");
        console.log(response)
        console.log(response.data.dataBody.popular_places)
        setPopular(response.data.dataBody.popular_places)
      } catch (error) {
        console.error(error);
      }
    }

  useEffect(() => {
    getPopular();
  }, []);

  return (
  <div>
    <p className={styles.popularTitle}>지금 내 근처 인기있는 장소는?</p>
    <div className={styles.popularDiv}>
      {/* <p className={styles.schedule}>스타벅스</p> */}
    </div>
    {popular.map((item, index) => (
    <div className={styles.popularDiv}>
      <p className={styles.popular}>{item.store}</p>
    </div>
    ))}
  </div>
  );
};

export default Report;
