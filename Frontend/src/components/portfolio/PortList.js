import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from "./PortList.module.css";
import axios from "axios";
import sad from "../../assets/sad.png"

// ports 순환하면서 책 형태로 포트폴리오 띄워줌
// 분기 : 만약 planList의 length가 0이라면? 아직 등록된 포트폴리오가 없어요!

const PortList = () => {
  const data = localStorage.getItem('userNumber');
  const [ports, setPorts]= useState([])

  const getPorts = async () => {
    try {
      const response = await axios.get("/api2/portfolio", { headers: { "User-Number": data } });
      console.log(response)
      console.log(response.data.dataBody.planList)
      setPorts(response.data.dataBody.planList)
    } catch (error) {
      console.error(error);
    }
  }
  
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    getPorts();
  }, []);

  return (
    <div>
      <div className={styles.titles}>
        <Link className={styles.backLink} to='/main'><p className={styles.toBack}>&lt;</p>
        <p className={styles.portfolioTitle}>여행 포트폴리오</p></Link>
      </div>
      {Array.isArray(ports) && ports.length === 0 ? (
        <div className={styles.noPort}>
          <img className={styles.sad} src={sad} alt="sad"/>
          <p className={styles.sadMent}>아직 끝마친 여행이 없어요</p>  
        </div>
      ) : (
        <>
          {ports.map((item, index) => (
            <div className={styles.hisData}>
              <Link to={{
                pathname: `/portfolio/${item.id}`,
                state: {
                  planId: item.id,
                },
              }} className={styles.link} >       
              <div className={styles.test_obj}><p className={styles.objText}>{formatDate(item.startDate)}<br />{formatDate(item.endDate)}</p></div></Link>   
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default PortList