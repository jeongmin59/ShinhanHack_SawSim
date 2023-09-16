import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from "./Map.module.css";
import Header from "../common/Header";
import axios from "axios";
import './Map.css'


const Map = () => {
  const mapRef = useRef();
  const data = localStorage.getItem('userNumber');
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get('planId');
  const [travelInfoList, setTravelInfoList] = useState([]) // 지도에 들어갈 정보들
  const [totalLength, setTotalLength] = useState(0);

  const getPortMap = async () => {
    try {
      const response = await axios.get(`https://sawsim.site/api/portfolio/${planId}/map`, { headers: { "User-Number": data } });
      console.log(response)
      console.log(response.data.dataBody.dataBody.travelInfoList)

      const sortedTravelInfoList = response.data.dataBody.dataBody.travelInfoList.sort((a, b) => {
        const dateA = new Date(`${a.transactionDate}T${a.transactionTime}`);
        const dateB = new Date(`${b.transactionDate}T${b.transactionTime}`);
  
        return dateA - dateB;
      });

      setTravelInfoList(sortedTravelInfoList)
      console.log(sortedTravelInfoList)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPortMap();
  }, []); // planId나 data가 바뀌는 경우에만 다시 실행되게 하려면 [planId, data]로 변경하세요.
  
  useEffect(() => {
    const script = document.createElement('script');
    script.onload = () => {
      window.kakao.maps.load(() => {
        // 마커 위치 및 타이틀 설정
        var positions = travelInfoList.map((info, i) => ({
          cost: info.amount,
          title: info.storeName,
          latlng: new window.kakao.maps.LatLng(info.latitude, info.longitude)
        }));
        // const centerPosition = positions.length > 0 ? positions[0].latlng : new window.kakao.maps.LatLng(33.450701, 126.570667);
        if (positions.length > 0) { // positions 배열이 비어있지 않은 경우만 지도를 생성합니다.
          const centerPosition = positions[0].latlng;
        const container = mapRef.current;
        const options = {
          center: centerPosition,
          level: 5,
        };
        
        // 지도 생성
        var map = new window.kakao.maps.Map(container, options);
      }

    
        for (let i=0; i<positions.length; i++) {
          // 마커 이미지 설정

          let imageSrc ="https://i.ibb.co/wcj0qJx/coin.png",
              imageSize = new window.kakao.maps.Size(40,40),
              imgOptions ={
                  // spriteSize :new window.kakao.maps.Size(36,691),
                  // spriteOrigin :new window.kakao.maps.Point(0,(i*46)+10),
                  offset:new window.kakao.maps.Point(20,20)
              },
              markerImage=new window.kakao.maps.MarkerImage(imageSrc,imageSize,imgOptions),
              marker=new window.kakao.maps.Marker({position :positions[i].latlng,title:positions[i].title,image :markerImage});

          marker.setMap(map);
          
          // 마커 위 띄워줄 텍스트
          var content = '<div class="customoverlay">' + 
          '   <span id="numbers">' + (i+1) + '</span> <span class="title">' + positions[i].title + '</span>'+
          '</div>';
      
          // addText(positions[i].latlng, content)
      
          // var position = new window.kakao.maps.LatLng(positions[i].latlng);

          var customOverlay = new window.kakao.maps.CustomOverlay({
            map: map,
            position: positions[i].latlng,
            content: content,
            yAnchor: 2
          });
          
          // markers.push(marker)

          // 클릭시 인포윈도우 표시 설정
          let infowindow=new window.kakao.maps.InfoWindow({zIndex :1});
          
          // window.kakao.maps.event.addListener(marker,'mouseover',function(){
          //   infowindow.setContent('<div style="width: 2rem; display: flex; text-align:center; align-items:center; justify-content:center; margin-left: auto; margin-right: auto;z-index :1;">'+positions[i].cost+'</div>');
          //   infowindow.open(map ,marker);
          //  });
           
           window.kakao.maps.event.addListener(marker,'mouseout',function(){
            infowindow.close();
           });

           var polyline = new window.kakao.maps.Polyline({
            path : positions.map(position => position.latlng), // 선을 구성하는 좌표 배열입니다.
            strokeWeight : 4,
            strokeColor : '#2e67d3',
            strokeOpacity : 0.3,
            strokeStyle : 'solid'
        });
        
        polyline.setMap(map); // 선을 지도에 표시합니다.
        
        // 선의 총 거리를 계산하고 출력합니다.
        console.log('단위는 미터', polyline.getLength());
        setTotalLength(polyline.getLength());

        // polyline.getLength().setMap(map)
        }
      });
    };
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=dcb221d398f716119c61870ef4204001';
    document.head.appendChild(script);
  }, [travelInfoList]);

  return (
    <>
      <div className={styles.container}>
        <div id="map" ref={mapRef} style={{ borderRadius: '1rem', margin: '0 auto', width: '95%', height: '400px', touchAction: 'auto' }}></div>
      </div>
    </>
  );
}

export default Map;