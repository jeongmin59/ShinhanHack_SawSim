import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import axios from 'axios';
import './Calendar.css';

const CalendarModal = () => {
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
          "startDate" : formattedStartDate,
          "endDate" : formattedEndDate
        },
      };

      const response = await axios.post('/plan', requestData);
      console.log('성공:', response.data);
    } catch (error) {
      console.error('그냥 에러:', error);
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

export default CalendarModal;
