import React, { useState } from 'react';
import styles from './TripDate.module.css';
import Calendar from './Calendar';
import { Button, Tooltip, Space } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const TripDate = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleCloseCalendar = () => {
    setIsCalendarVisible(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>여행 일정</p>
        <Space direction="horizontal">
          <Tooltip title={isCalendarVisible ? '여행 일정 닫기' : '여행 일정 추가하기'}>
            <Button
              shape="circle"
              icon={isCalendarVisible ? <CalendarOutlined /> : <CalendarOutlined />}
              onClick={isCalendarVisible ? handleCloseCalendar : toggleCalendar}
            />
          </Tooltip>
        </Space>
      </div>
      {isCalendarVisible && <Calendar onClose={handleCloseCalendar} />}
    </div>
  );
}

export default TripDate;
