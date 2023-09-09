import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Cash.module.css";
import Header from "../components/common/Header";
import CashorOCR from "../components/cash/CashorOCR";

const Cash = () => {
  return (
    <div>
      <Header/>
      <CashorOCR/>
    </div>
  )
}

export default Cash