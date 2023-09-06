import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/locale';
import "./Calendar.css"

const CalendarModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');
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

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    console.log('취소');
    setOpen(false);
  };

  console.log('startDate:', startDate)
  console.log('endDate:', endDate)

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
        {/* <p>{modalText}</p> */}
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
