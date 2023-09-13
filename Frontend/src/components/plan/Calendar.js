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
  const data = localStorage.getItem('userNumber');

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
      // 기존 계획을 가져옴
      const existingPlanResponse = await axios.get(`https://sawsim.site/api/plan`, {
        headers: { "User-Number": data }
      });
  
      const existingPlanData = existingPlanResponse.data.dataBody;
  
      // 사용자가 계획을 수정하려고 할 때
      if (existingPlanData !== null) {
        // 기존 계획을 업데이트하는 POST 요청
        const updateRequestData = {
          dataBody: {
            startDate: formattedStartDate,
            endDate: formattedEndDate
          },
        };
  
        const updatePlanResponse = await axios.post(`https://sawsim.site/api/plan/${existingPlanData.planId}`, updateRequestData, {
          headers: { "User-Number": data }
        });
  
        console.log('기존 계획 수정 성공', updatePlanResponse.data);
      } else {
        // 기존 계획이 없을 때, 새로운 계획 추가
        const addRequestData = {
          dataBody: {
            startDate: formattedStartDate,
            endDate: formattedEndDate
          },
        };
  
        const addPlanResponse = await axios.post('https://sawsim.site/api/plan', addRequestData, {
          headers: { "User-Number": data }
        });
  
        console.log('새로운 계획 추가 성공', addPlanResponse.data);
      }
  
      // localStorage.setItem('startDate', formattedStartDate);
      // localStorage.setItem('endDate', formattedEndDate);
  
    } catch (error) {
      console.error('에러:', error);
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
