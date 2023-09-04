import {React,useState} from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import styles from "./Insurance.module.css";
import axios from "axios";

const Insurance = () => {
  return (
  <div>
    <p className={styles.insuranceTitle}>여행할 때 필요한 보험은?</p>
    <div className={styles.insurances}>
      <div className={styles.insuranceDiv}>     
        <p className={styles.insurance}>신한 여행자 보험</p>
      </div>  
      <div className={styles.insuranceDiv}>     
        <p className={styles.insurance}>삼성화재</p>
        <p className={styles.insurance}>다이렉트</p>
        <p className={styles.insurance}>보험</p>
      </div>  
      <div className={styles.insuranceDiv}>     
        <p className={styles.insurance}>트래블로버</p>
      </div>  
    </div>
    <div className={styles.insurances}>
      <div className={styles.insuranceDiv}>     
        <p className={styles.insurance}>신한 여행자 보험</p>
      </div>  
      <div className={styles.insuranceDiv}>     
        <p className={styles.insurance}>삼성화재</p>
        <p className={styles.insurance}>다이렉트</p>
        <p className={styles.insurance}>보험</p>
      </div>  
      <div className={styles.insuranceDiv}>     
        <p className={styles.insurance}>트래블로버</p>
      </div>  
    </div>
  </div>
  );
};

export default Insurance;
