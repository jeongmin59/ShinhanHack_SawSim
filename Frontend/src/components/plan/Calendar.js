import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from 'axios';
import { Button, List } from 'antd';

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

  const start = new Date(selection.startDate);
  const end = new Date(selection.endDate);
  const dayCount = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

  const dailyInfo = [];

  for (let i = 0; i < dayCount; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(currentDate.getDate() + i);

    dailyInfo.push({
      date: currentDate,
      // date: currentDate.toLocaleDateString(), // 일자를 원하는 형식으로 표시
    });
  }

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
      <div>
      <h2>날짜별 예산</h2>
      <List
        itemLayout="horizontal"
        dataSource={dailyInfo}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={`날짜: ${item.date.toLocaleDateString()}`}
            />
          </List.Item>
        )}
      />
    </div>

    </div>
  );
};

export default Calendar;
