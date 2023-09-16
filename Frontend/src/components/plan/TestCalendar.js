import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import axios from 'axios';
import './Calendar.css';

const TestCalendar = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
  
    try {
      // POST 요청 데이터를 불러와서 사용합니다.
      const requestData = require('public/data/addTravelPlan_request.json');
  
      const response = await axios.post('/plan', requestData, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': '233hWS3k',
        },
      });
  
      console.log('성공:', response.data);
    } catch (error) {
      console.error('에러:', error);
    } finally {
      setConfirmLoading(false);
      setOpen(false);
    }
  };
  

  const handleCancel = () => {
    console.log('취소');
    setOpen(false);
  };

  console.log('startDate:', startDate);
  console.log('endDate:', endDate);

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        일정 선택
      </Button>
      <Modal
        title="일정을 선택해주세요"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={290}
      >
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          minDate={new Date()}
          locale={ko}
        />
      </Modal>
    </div>
  );
};

export default TestCalendar;
