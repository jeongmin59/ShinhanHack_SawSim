import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./PortfolioDetail.module.css";
import Header from "../components/common/Header";
import Map from "../components/portfolio/Map"
import Analysis from "../components/portfolio/Analysis"

const PortfolioDetail = () => {
  return (
    <div>
      <Header/>
      <Analysis/>
      <Map/>
    </div>
  )
}

export default PortfolioDetail