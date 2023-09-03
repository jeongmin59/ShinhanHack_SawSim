import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function CalendarComponent() {
  const [selection, setSelection] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const onRangeChange = (ranges) => {
    console.log(ranges);
    setSelection({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: 'selection'
    });
  }

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={onRangeChange}
        moveRangeOnFirstSelection={false}
        ranges={[selection]}
      />
      <br />
      <div>Start Date: {selection.startDate.toString()}</div>
      <br />
      <div>End Date: {selection.endDate.toString()}</div>
    </div>
  );
}

export default CalendarComponent;
