import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "./PopularSpots.module.css";
import axios from "axios";
import { Space, Tag } from 'antd';

const { CheckableTag } = Tag;
const tagsData = ['음식점', '관광지', '스포츠,레저'];

const PopularSpots = () => {
  const [populars, setPopulars] = useState([]);
  const [selectedTag, setSelectedTag] = useState('음식점');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => console.error('위치 안 받아짐', error)
        );
      } else {
        console.error('브라우저 지원 에러');
      }
    };
    console.log(latitude)
    console.log(longitude)
    
  // 위치 정보 가져오기
  useEffect(() => {
    getLocation();
  }, []);


  // 인기장소 조회
  const getPopular = async () => {
    try {
      let categoryType;
      if (selectedTag === '음식점') {
        categoryType = 'RESTAURANT';
      } else if (selectedTag === '관광지') {
        categoryType = 'SIGHTS';
      } else if (selectedTag === '스포츠,레저') {
        categoryType = 'LEISURE';
      }

      if (latitude !== null && longitude !== null) {
        const response = await axios.get(`https://sawsim.site/api/popular/${categoryType}?lon=${longitude}&lat=${latitude}`);
        console.log(response);
        console.log(response.data.dataBody);
        setPopulars(response.data.dataBody);
      } else {
        console.error('위도 경도 유효하지 않음');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 위치 정보 가져오기
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      getPopular();
    }
  }, [latitude, longitude, selectedTag]);

    const handleChange = (tag, checked) => {
      if (checked) {
        console.log('선택한 태그: ', tag);
        setSelectedTag(tag);
      }
    };

  return (
    <div>
      <div className={styles.titles}>
        <Link className={styles.backLink} to='/budget'><p className={styles.toBack}>&lt;</p>
        <p className={styles.popularTitle}></p></Link> 
      </div>

      {/* <p className={styles.popularMent}>지금 이 순간 <span style={{fontFamily:'preBd',color:'#316FDF'}}>인기 있는</span> 장소는?</p> */}
      <p className={styles.popularMent}>사람들이 <span style={{fontFamily:'preBd',color:'#316FDF'}}>많이 결제한 </span> 장소를 알려드려요!</p>

       <Space size={[0, 8]} wrap>
        {tagsData.map((tag) => (
          <CheckableTag
            style={{
              borderRadius:'0.5rem',
              fontFamily: 'preRg',
              fontSize:'1rem',
              border: selectedTag === tag ? '' : '1px solid #d9d9d9',
              backgroundColor: selectedTag === tag ? '#316FDF' : '#fff',
              color: selectedTag === tag ? '#fff' : '#000',
              paddingTop: '0.2rem',
              paddingBottom: '0.2rem'
            }}
            key={tag}
            checked={selectedTag === tag}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
       </Space>
        
        <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap' }}>
       {populars.filter(item=>item.category===selectedTag).map((item, index) => (
         <div className={styles.popularDiv} style={{ width: '50%' }} key={item.popularId}>
            <a href={`https://www.google.com/search?q=${item.storeName}&oq=${item.storeName}&aqs=edge..69i57.1023j0j4&sourceid=chrome&ie=UTF-8`} target="_blank" rel="noopener noreferrer">
            <img loading="lazy" className={styles.img} src={item.thumbnail} alt="img"/></a>
           <p className={styles.store}>{item.storeName}</p>
         </div>
       ))}
        </div>  
        </div>
   )
}

export default PopularSpots;