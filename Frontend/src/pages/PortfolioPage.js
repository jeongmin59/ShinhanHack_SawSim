import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./PortfolioPage.module.css";
import Header from "../components/common/Header";
import Map from "../components/portfolio/Map"
import Analysis from "../components/portfolio/Analysis"

const PortfolioPage = () => {
  return (
    <div>
      <Header/>
      <Analysis/>
      <Map/>
    </div>
  )
}

export default PortfolioPage