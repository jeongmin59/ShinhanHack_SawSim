import React from 'react';
import Header from "../components/common/Header";
import SelectedDate from '../components/plan/SelectedDate';
import DateList from '../components/plan/DateList';

const PlanDetail = () => {

  return (
    <div>
     <div>
      <Header/>
      <SelectedDate />
      <DateList />
      </div>
    </div>
  );
};

export default PlanDetail;