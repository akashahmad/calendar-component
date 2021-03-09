import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const height = 47;
const ScheduleGanttBars: FC<{
  baseWidth: number;
  numberOfUnits: number;
  offsetX?: number;
  offsetY?: number;
  divisor?: number;
  unitColor: string;
  print?: any;
  chunkIndex?: number;
}> = ({
  baseWidth,
  numberOfUnits,
  offsetX = 0,
  offsetY = 0,
  divisor = 24,
  unitColor,
  print = false,
  chunkIndex = 0
}) => {
  const unit = baseWidth / divisor;
  const width = unit * numberOfUnits;
  const marginLeft = unit * offsetX;
  let marginTop = (height + 5) * offsetY + 2;
  if (print && chunkIndex !== 0) {
    const mod = chunkIndex / 10;
    marginTop -= height * (chunkIndex + mod) + 3 * mod;
  }
  const Styles = useStyles();
  return (
    <div
      className={print ? Styles.bar : Styles.barAnimation}
      style={{
        width,
        marginLeft,
        marginTop,
        background: unitColor
      }}
    />
  );
};

const useStyles = makeStyles({
  bar: {
    position: 'absolute',
    height: height,
    borderRadius: '2px',
    zIndex: 5
  },
  barAnimation: {
    position: 'absolute',
    height: height,
    borderRadius: '2px',
    zIndex: 5,
    animation: `$loadProgressBar 1s linear`,
    '@global': {
      '@keyframes loadProgressBar': {
        '0%': {
          width: 0
        },
        '100%': {}
      }
    }
  }
});

export default ScheduleGanttBars;
