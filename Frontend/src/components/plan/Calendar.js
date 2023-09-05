import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button, Modal } from 'antd';
import "./Calendar.css"
import dayjs from 'dayjs';

const CalendarModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');

  const [date, setDate] = useState(new Date());

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('취소');
    setOpen(false);
  };
  console.log(date)
  // console.log('startDate:', selection.startDate);
  // console.log('endDate:', selection.endDate);

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        일정 선택
      </Button>
      <Modal
        // title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        style={{ top: 20 }}
      >
      <h3 className='text-center'>일정을 선택해주세요.</h3>
      <div className='calendar-container'>
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={true}
          formatDay ={(locale, date) => dayjs(date).format('DD')}
        />
      </div>
      {date.length > 0 ? (
        <p className='text-center'>
          <span className='bold'>시작:</span>{' '}
          {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className='bold'>종료:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className='text-center'>
          <span className='bold'>선택된 날짜:</span>{' '}
          {date.toDateString()}
        </p>
      )}
      </Modal>
    </div>
  );
};

export default CalendarModal;
