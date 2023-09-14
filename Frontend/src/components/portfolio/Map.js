import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Map.module.css";
import Header from "../common/Header";

const Map = () => {
  const mapRef = useRef(); // Create a ref object

  useEffect(() => {
    const script = document.createElement('script');
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 5,
        };
        
        // 지도 생성
        var map = new window.kakao.maps.Map(container, options);

        // 마커 위치 및 타이틀 설정
        var positions = [
            { title: '카카오', latlng: new window.kakao.maps.LatLng(33.450705, 126.570677) },
            { title: '생태연못', latlng: new window.kakao.maps.LatLng(33.450936, 126.569477) },
            { title: '텃밭', latlng: new window.kakao.maps.LatLng(33.450879, 126.569940) },
            { title: '근린공원', latlng: new window.kakao.maps.LatLng(33.451393, 126.570738) }
        ];

        for (let i=0; i<positions.length; i++) {
          // 마커 이미지 설정
          let imageSrc ='https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
              imageSize = new window.kakao.maps.Size(36,37),
              imgOptions ={
                  spriteSize :new window.kakao.maps.Size(36,691),
                  spriteOrigin :new window.kakao.maps.Point(0,(i*46)+10),
                  offset:new window.kakao.maps.Point(13,37)
              },
              markerImage=new window.kakao.maps.MarkerImage(imageSrc,imageSize,imgOptions),
              marker=new window.kakao.maps.Marker({position :positions[i].latlng,image :markerImage});

          marker.setMap(map);
          
          // 클릭시 인포윈도우 표시 설정
          let infowindow=new window.kakao.maps.InfoWindow({zIndex :1});
          
          window.kakao.maps.event.addListener(marker,'mouseover',function(){
            infowindow.setContent('<div style="padding :5px;z-index :1;">'+positions[i].title+'</div>');
            infowindow.open(map ,marker);
           });
           
           window.kakao.maps.event.addListener(marker,'mouseout',function(){
            infowindow.close();
           });
        }
      });
    };
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=dcb221d398f716119c61870ef4204001';
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Link to="/" className={styles.back}>
          뒤로가기
        </Link>
        <div id="map" ref={mapRef} style={{ width: '100%', height: '400px', touchAction: 'auto' }}></div>
        </div>
    </>
  );
}

export default Map;