import React, { FC } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Box } from '@material-ui/core';

const Container: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center">
    {children}
  </Box>
);

type Props = {
  value: string;
  handleChange: any;
  handleToggleUnit: any;
  getColor: any;
  type: string;
  data: any;
};

const ScheduleDropDown: FC<Props> = ({
  value,
  handleChange,
  handleToggleUnit,
  getColor,
  type,
  data
}) => {
  const getUnitColor = (unitNumber: any): any => {
    const color = getColor.unit.find((unit: any) => {
      return unit.number === parseInt(unitNumber);
    });
    if (color) {
      return '#' + color.unitColor[0].color;
    } else {
      return false;
    }
  };

  const Styles = useStyles();
  return (
    <div className={Styles.container}>
      <FormControl component="fieldset">
        <FormLabel component="legend" className={Styles.title}>
          Filter by unit
        </FormLabel>
        <RadioGroup
          aria-label="filter"
          name="units"
          value={value}
          onChange={event => handleChange(data, event.target.value)}
        >
          <FormControlLabel value="All" control={<Radio />} label="All" />
          {getColor.unit.map((u: any) => (
            <Container>
              <>
                <FormControlLabel
                  value={`Unit ${u.number}`}
                  control={<Radio />}
                  label={`Unit ${u.number}`}
                />
                <span
                  className={Styles.oval}
                  style={{
                    backgroundColor: getUnitColor(u.number)
                  }}
                ></span>
              </>
            </Container>
          ))}
          <Container>
            <>
              <FormControlLabel
                value="Common"
                control={<Radio />}
                label="Common"
              />

              <span
                className={Styles.oval}
                style={{ backgroundColor: '#005df8' }}
              ></span>
            </>
          </Container>
        </RadioGroup>
      </FormControl>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    borderRadius: 8,
    boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.5)',
    backgroundColor: 'white',
    padding: '10px 15px'
  },
  oval: {
    borderRadius: '100%',
    width: 12,
    height: 12
  },
  title: {
    padding: '5px 0',
    fontSize: 16,
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.25,
    color: '#373737'
  }
});

export default ScheduleDropDown;
