import React from 'react';
import axios from 'axios';
import { Button } from 'antd';

const DeleteBuget = () => {

  // 백엔드 연결 후 수정
  const handleDelete = async () => {
    try {
      const requestData = {
        dataBody: { 
          "travelDate":"2023-08-25",
          "category" : "교통비",
          "amount" : "9000"
        },
        };
      const response = await axios.delete('/budget/{plan_id}', requestData);
      console.log('성공:', response);
    } catch (error) {
      console.error('에러:', error);
    }
  };

  return (
    <div>
      <div>
        하이
      </div>
      <Button onClick={handleDelete}>삭제</Button>
    </div>
  );
}

export default DeleteBuget;
