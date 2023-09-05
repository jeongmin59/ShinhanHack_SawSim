import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button, Modal } from 'antd';
import "./Calendar.css"
import dayjs from 'dayjs'; // dd일 이 아니라 d로 표시하게 함
import axios from 'axios';

const CalendarModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');
  const [date, setDate] = useState(new Date());

  const saveDateToLocalStorage = (selectedDate) => {
    try {
      // date를 문자열로 변환하여 로컬 스토리지에 저장
      localStorage.setItem('selectedDate', JSON.stringify(selectedDate));
    } catch (error) {
      console.error('로컬 스토리지 저장 안 됨', error);
    }
  };
  
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    // setModalText('2초후 닫힘');
    setConfirmLoading(true);

    try {
      // 서버에 보낼 데이터
      const requestData = {
        dataBody: {
          startDate: date[0], // 시작 날짜
          endDate: date[1],   // 종료 날짜
        },
      };
      // POST 요청
      const response = await axios.post('/plan', requestData);
      console.log('요청 성공:', response.data);
      saveDateToLocalStorage(date)

    } catch (error) {
      console.error('요청 실패:', error);
      saveDateToLocalStorage(date)
    }

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 500);
    window.location.reload();
  };

  const handleCancel = () => {
    console.log('취소');
    setOpen(false);
  };
  // console.log(date)

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
