import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./PopularPage.module.css";
import Header from "../components/common/Header";
import PopularSpots from "../components/popular/PopularSpots";

const PopularPage = () => {
  return (
    <div>
      <Header/>
      <PopularSpots/>
    </div>
  )
}

export default PopularPage