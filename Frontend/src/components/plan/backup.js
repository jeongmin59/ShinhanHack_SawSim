import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Button, Modal } from 'antd';

// const { RangePicker } = DatePicker;

const Calendar = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [selection, setSelection] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const onRangeChange = (ranges) => {
    console.log(ranges);
    setSelection({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: 'selection',
    });
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  console.log('startDate:', selection.startDate);
  console.log('endDate:', selection.endDate);

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        일정 선택
      </Button>
      <Modal
        title="Title"
        open={open} // Correct the prop name from "open" to "visible"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        style={{ top: 20 }}
        // bodyStyle={{ maxHeight: '60vh', overflow: 'auto' }}
      >
      <div style={{ maxHeight: '60vh', maxWidth: '70vw', overflow: 'auto' }}>
      <DateRange
        editableDateInputs={true}
        onChange={onRangeChange}
        moveRangeOnFirstSelection={false}
        ranges={[selection]}
      />
      </div>
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default Calendar;
