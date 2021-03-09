import React, { FC, useRef, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';

import Time from './ScheduleGanttTime';
import Line from './ScheduleGanttLine';
import Bars from './ScheduleGanttBars';

const ScheduleGanttDay: FC<{
  day: string;
  days: number;
  flexHeader: string;
  graph: string;
  backgroundDay: string;
  timeLine?: any;
  print?: any;
  chunkIndex?: number;
}> = ({
  day,
  days,
  flexHeader,
  graph,
  backgroundDay,
  timeLine = [],
  print,
  chunkIndex = 0
}) => {
  const [width, setWidth] = useState(0);
  const timelineRef = useRef<any>(null);
  useEffect(() => {
    const resizeListener = () => {
      setWidth(timelineRef?.current?.clientWidth);
    };
    window.addEventListener('resize', resizeListener);
    setWidth(timelineRef?.current?.clientWidth);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  const lineOneOffSet = (width / 24) * 8;
  const lineTwoOffSet = (width / 24) * 16;

  return (
    <Grid
      className={backgroundDay}
      item
      style={{ height: '100%', width: `calc(100% / ${days})` }}
    >
      {chunkIndex === 0 && (
        <div
          className={flexHeader}
          style={{ position: 'relative', borderRight: '0' }}
        >
          <p>{day}</p>
          {days <= 7 && (
            <>
              <Time offSet={0} hour={23} />
              <Time offSet={lineOneOffSet} hour={7} />
              <Time offSet={lineTwoOffSet} hour={15} />
            </>
          )}
        </div>
      )}
      <div className={graph} ref={timelineRef}>
        <Line offSet={0} />
        {days <= 7 && (
          <>
            <Line offSet={lineOneOffSet} />
            <Line offSet={lineTwoOffSet} />
          </>
        )}
        {timeLine.map((time: any, index: number) => {
          return (
            <Bars
              key={index}
              numberOfUnits={time.numberOfUnits}
              baseWidth={width}
              offsetX={time.offSetX}
              offsetY={time.offSetY}
              unitColor={time.unitColor}
              print={print}
              chunkIndex={chunkIndex}
            />
          );
        })}
      </div>
    </Grid>
  );
};

export default ScheduleGanttDay;
