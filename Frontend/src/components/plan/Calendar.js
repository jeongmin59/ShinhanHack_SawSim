import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from 'axios';
import { Button } from 'antd';
import DateList from './DateList';

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

  const handleConfirm = async () => {
    try {
      // 선택한 날짜 범위를 서버에 전송
      await axios.post('/plan', {
        startDate: selection.startDate,
        endDate: selection.endDate,
      });
      console.log('날짜 범위 전송 성공');
      onClose();
    } catch (error) {
      console.error('에러', error);
      onClose();
    }
  };

  console.log('startDate:', selection.startDate);
  console.log('endDate:', selection.endDate);

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={onRangeChange}
        moveRangeOnFirstSelection={false}
        ranges={[selection]}
      />
      <Button onClick={handleConfirm}>확인</Button>
      <DateList startDate={selection.startDate} endDate={selection.endDate} />
    </div>
  );
};

export default Calendar;
