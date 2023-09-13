import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import axios from 'axios';
import './Calendar.css';

const CalendarModal = ({ onDateSelected }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  // localStorage.setItem('date', date);
  const data = localStorage.getItem('userNumber');
  // const data = localStorage.getItem('date');

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

    const formattedStartDate = startDate.toISOString().split('T')[0];
    let formattedEndDate = null;

    if (endDate !== null) {
      formattedEndDate = endDate.toISOString().split('T')[0];
    } else {
      formattedEndDate = formattedStartDate;
    }

    console.log('변환된 Start Date:', formattedStartDate);
    console.log('변환된 End Date:', formattedEndDate);

    try {
      const requestData = {
        dataBody: { 
          startDate : formattedStartDate,
          endDate : formattedEndDate
        },
      };

      // const headers = {"User-Number": "44b78142-4320-4115-88f1-86bb562fbc0c"}
      const response = await axios.post('/api2/plan', requestData, { headers: { "User-Number" : data } });
      console.log('성공', response.data);

      localStorage.setItem('startDate', formattedStartDate);
      localStorage.setItem('endDate', formattedEndDate);

    } catch (error) {
      console.error('그냥 에러:', error);
    } finally {
      setConfirmLoading(false);
      setOpen(false);
      window.location.reload();
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
      <Button type="primary"
      onClick={showModal}
      style={{height: '2rem', 
        width: '25%', 
        backgroundColor:'#316FDF', 
        // marginTop: '3rem',
        fontFamily:"preRg"}} 
      size="middle"
      >
        일정 선택
      </Button>
      <Modal
        title="일정을 선택해주세요"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={290}
        style={{height: '2.5rem', width: '30%', 
        backgroundColor:'#316FDF', fontFamily:"preRg"}} 
        size="large"
        okText="확인"
        cancelText="취소" 
        okButtonProps={{
          style: {
            backgroundColor: '#316FDF', 
            fontFamily:"preRg"
          },
        }}
        cancelButtonProps={{
          style: {
            fontFamily:"preRg"
          },
        }}
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

export default CalendarModal;
