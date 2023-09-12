import React, { useState } from 'react';
import axios from 'axios';

function BudgetItem({ plan_id, onDelete }) {
  const handleDelete = () => {
    axios.delete(`/budget/${plan_id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: {
        dataBody: {
          travelDate: "2023-08-25",
          category: "교통비",
          amount: "9000"
        }
      }
    })
    .then(response => {
      if (response.data.dataHeader.successCode === "0") {
        onDelete(); // 삭제가 성공하면 부모 컴포넌트에서 해당 아이템을 업데이트하도록 콜백 호출
      } else {
        console.error('삭제 실패:', response.data.dataHeader.resultMessage);
      }
    })
    .catch(error => {
      console.error('삭제 오류:', error);
    });
  };

  return (
    <div>
      {/* 기타 예산 정보 표시 */}
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default BudgetItem;
