import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./PortfolioPage.module.css";
import Header from "../components/common/Header";
import Map from "../components/portfolio/Map"
import Analysis from "../components/portfolio/Analysis"
import PortList from "../components/portfolio/PortList"

const PortfolioPage = () => {
  return (
    <div>
      <Header/>
      <PortList/>
    </div>
  )
}

export default PortfolioPage