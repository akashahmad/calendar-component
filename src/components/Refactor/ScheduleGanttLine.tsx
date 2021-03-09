import React, { FC } from 'react';

const ScheduleGanttLine: FC<{ offSet: number }> = ({ offSet }) => {
  return (
    <div
      style={{
        height: '100%',
        position: 'absolute',
        borderLeft: '1px solid #e6e6e6',
        left: `${offSet}px`,
        zIndex: 6,
        top: 0
      }}
    />
  );
};

export default ScheduleGanttLine;
