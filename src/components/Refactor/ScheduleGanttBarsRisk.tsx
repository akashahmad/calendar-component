import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const height = 47;
const ScheduleGanttBarsRisk: FC<{
  baseWidth: number;
  numberOfUnits: number;
  offsetX?: number;
  offsetY?: number;
  divisor?: number;
  riskColor: string;
}> = ({
  baseWidth,
  numberOfUnits,
  offsetX = 0,
  offsetY = 0,
  divisor = 24,
  riskColor
}) => {
  const unit = baseWidth / divisor;
  const width = unit * numberOfUnits;
  const marginLeft = unit * offsetX;
  const marginTop = (height + 5) * offsetY + 2;

  const Styles = useStyles();
  return (
    <div
      className={Styles.bar}
      style={{
        width,
        marginLeft,
        marginTop,
        background:
          riskColor === 'White'
            ? 'repeating-linear-gradient(-45deg,#E0E0E0 5px,#E0E0E0 5px,#ffffff 10px,#ffffff 20px)'
            : riskColor
      }}
    />
  );
};

const useStyles = makeStyles({
  bar: {
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

export default ScheduleGanttBarsRisk;
