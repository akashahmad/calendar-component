import React, { FC } from 'react';

const ScheduleGanttTime: FC<{ offSet: number; hour: number }> = ({
  offSet,
  hour
}) => {
  return (
    <>
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: `${offSet}px`
        }}
      >
        {hour}h
      </span>
    </>
  );
};

export default ScheduleGanttTime;
