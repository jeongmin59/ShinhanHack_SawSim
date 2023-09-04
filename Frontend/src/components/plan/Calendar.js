import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from 'axios';
import { Button } from 'antd';
import DailyBudget from './DailyBudget'; // DailyBudget 컴포넌트 import

const Calendar = ({ onClose }) => {
  const [selection, setSelection] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const onRangeChange = (ranges) => {
    console.log(ranges);
    setSelection({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: 'selection',
    });
  };

  const handleConfirm = () => {
    // 선택한 날짜 범위를 서버에 전송
    axios
      .post('/plan', {
        startDate: selection.startDate,
        endDate: selection.endDate,
      })
      .then((response) => {
        console.log('날짜 범위 전송 성공');
        onClose();
      })
      .catch((error) => {
        console.error('에러', error);
        onClose();
      });
  };

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={onRangeChange}
        moveRangeOnFirstSelection={false}
        ranges={[selection]}
      />
      <Button onClick={handleConfirm}>확인</Button>
      {/* DailyBudget 컴포넌트에 startDate와 endDate 전달 */}
      <DailyBudget startDate={selection.startDate} endDate={selection.endDate} />
    </div>
  );
};

export default Calendar;
