import React from 'react';

const DailyBudget = React.memo(({ startDate, endDate }) => {
  
  console.log('startDate:', startDate);
  console.log('endDate:', endDate);
  
  return (
    <div>
      <h2>시작 날짜: {startDate ? startDate.toString() : '데이터 없음'}</h2>
      <h2>종료 날짜: {endDate ? endDate.toString() : '데이터 없음'}</h2>
    </div>
  );
})

export default DailyBudget;
