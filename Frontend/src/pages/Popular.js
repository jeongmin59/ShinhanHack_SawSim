import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Popular.module.css";
import Header from "../components/common/Header";
import PopularSpots from "../components/main/PopularSpots";

const CashCreate = () => {
  return (
    <div>
      <Header/>
      <PopularSpots/>
    </div>
  )
}

export default CashCreate