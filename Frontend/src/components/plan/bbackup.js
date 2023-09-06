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
  console.log(date)

  return (
    <div>
      <Button 
        type="primary" 
        onClick={showModal}
        style={{ backgroundColor:'#0046FF', fontFamily:"preRg" }}>
        일정 선택
      </Button>
      <Modal
        // title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        style={{ fontFamily:"preRg" }}
        maskStyle={{ fontFamily:"preRg" }}
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






// .react-calendar { 
//     width: 400px;
//     max-width: 100%;
//     background-color: #fff;
//     color: #222;
//     border-radius: 8px;
//     box-shadow: none;
//     font-family: Arial, Helvetica, sans-serif;
//     line-height: 1.125em;
//   }
//   .react-calendar__navigation button {
//     color: #0046FF;
//     min-width: 44px;
//     background: none;
//     font-size: 16px;
//     margin-top: 8px;
//   }
//   .react-calendar__navigation button:enabled:hover,
//   .react-calendar__navigation button:enabled:focus {
//     background-color: #f8f8fa;
//   }
//   .react-calendar__navigation button[disabled] {
//     background-color: #f0f0f0;
//   }
//   abbr[title] {
//     text-decoration: none;
//   }
//   /* .react-calendar__month-view__days__day--weekend {
//   color: #d10000;
//   } */
//   .react-calendar__tile:enabled:hover,
//   .react-calendar__tile:enabled:focus {
//     background: #f8f8fa;
//     color: #0046FF;
//     border-radius: 6px;
//   }
//   .react-calendar__tile--now {
//     background: #6f48eb33;
//     border-radius: 6px;
//     font-weight: bold;
//     color: #0046FF;
//   }
//   .react-calendar__tile--now:enabled:hover,
//   .react-calendar__tile--now:enabled:focus {
//     background: #6f48eb33;
//     border-radius: 6px;
//     font-weight: bold;
//     color: #0046FF;
//   }
//   .react-calendar__tile--hasActive:enabled:hover,
//   .react-calendar__tile--hasActive:enabled:focus {
//     background: #f8f8fa;
//   }
//   .react-calendar__tile--active {
//     background: #0046FF;
//     border-radius: 6px;
//     font-weight: bold;
//     color: white;
//   }  
//   .react-calendar__tile--active:enabled:hover,
//   .react-calendar__tile--active:enabled:focus {
//     background: #0046FF;
//     color: white;
//   }
//   .react-calendar--selectRange .react-calendar__tile--hover {
//     background-color: #f8f8fa;
//   }
//   .react-calendar__tile--range {
//     background: #f8f8fa;
//     color: #0046FF;
//     border-radius: 0;
//   }
//   .react-calendar__tile--rangeStart {
//     border-top-right-radius: 0;
//     border-bottom-right-radius: 0;
//     border-top-left-radius: 6px;
//     border-bottom-left-radius: 6px;
//     background: #0046FF;
//     color: white;
//   }
//   .react-calendar__tile--rangeEnd {
//     border-top-left-radius: 0;
//     border-bottom-left-radius: 0;
//     border-top-right-radius: 6px;
//     border-bottom-right-radius: 6px;
//     background: #0046FF;
//     color: white;
//   }