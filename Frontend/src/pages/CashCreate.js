import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./CashCreate.module.css";
import Header from "../components/common/Header";
import CreateInPerson from "../components/cash/CreateInPerson";

const CashCreate = () => {
  return (
    <div>
      <Header/>
      <CreateInPerson/>
    </div>
  )
}

export default CashCreate