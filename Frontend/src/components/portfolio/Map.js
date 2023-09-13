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
          level: 3,
        };
        new window.kakao.maps.Map(container, options);
      });
    };
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=dcb221d398f716119c61870ef4204001';
    document.head.appendChild(script);
  }, []);

  return <div id="map" ref={mapRef} style={{ width: '100%', height: '400px', touchAction: 'auto' }}></div>;
}

export default Map;