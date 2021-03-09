import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
// import { Plant } from '../../models/plant-status/plant.model';

// import LoadingNotifier from '../LoadingNotifier';
import Day from "./ScheduleGanttDay";
// import RiskDay from './ScheduleGanttDayRisk';

import moment from "moment";

import { withStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
// import { riskCodeLookup } from "./shared/RiskCodes";
//@ts-ignore
// import DateIcon from '../../icons/pod/date-start.svg';
//@ts-ignore
// import TimeIcon from '../../icons/pod/time.svg';
//@ts-ignore
// import IdIcon from '../../icons/pod/id.svg';
//@ts-ignore
// import UnitsIcon from '../../icons/pod/units.svg';
//@ts-ignore
// import GroupsIcon from '../../icons/pod/groups.svg';
//@ts-ignore
// import RiskIcon from '../../icons/pod/risk.svg';

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    width: "268px",
    boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.5)",
    border: "solid 1px #e5e7ec",
    backgroundColor: "#fff",
    color: "#373737",
    listStyleType: "none",
  },
}))(Tooltip);

const ScheduleGannet = (props: any) => {
  const Styles = useStyles();
  const flexCell = clsx(Styles.flexAlign, Styles.name);
  const flexHeader = clsx(Styles.flexAlign, Styles.header);
  const { display, activeDate, activies, riskData } = props;
  const riskTitles = (riskData || []).map((item: any) => {
    return item.DESCRIPTION;
  });
  var risks = riskTitles.filter((item: any, index: any) => {
    return riskTitles.indexOf(item) === index;
  });
  // const user = useSelector((state: any) => state.app.user);
  // const plants = useSelector(
  //   (state: any) => state.plantStatus.plants
  // ).sort((a: Plant, b: Plant) => (a.name > b.name ? 1 : -1));
  // const userPlant =
  //   plants.find((plant: Plant) => plant.id === user.plantID) || plants[0];

  const getUnitColor = (unitNumber: any): any => {
    // const color = userPlant.unit.find((unit: any) => {
    //   return unit.number === parseInt(unitNumber);
    // });
    // if (color) {
    //   return "#" + color.unitColor[0].color;
    // } else {
    //   return "#005df8";
    // }
  };

  const timeLine = (data: any, day: string) => {
    return (data || [])
      .filter((activity: any) => {
        const activityStart: any = moment(activity.START_DATE);
        const activityEnd: any = moment(activity.END_DATE);
        const dayStart: any = moment(day, "MMM D");
        const activeDay: any = moment(activeDate);
        const isPreviousOverlap =
          activityStart.isBefore(dayStart) &&
          activeDay.format("MMM D") === day &&
          activityEnd.isAfter(dayStart);
        return activityStart.format("MMM D") === day || isPreviousOverlap;
      })
      .map((activity: any, index: any) => {
        const startMoment: any = moment(activity.START_DATE);
        const endMoment = moment(activity.END_DATE);
        const dayStart: any = moment(day, "MMM D");
        const duration = moment.duration(endMoment.diff(startMoment));
        const hours = duration.asHours();
        const offSetX =
          moment.duration(startMoment.diff(dayStart)).asHours() + 1;
        const offSetY = data.findIndex(
          (act: any) => act.ACTIVITY_ID === activity.ACTIVITY_ID
        );
        const result = {
          numberOfUnits: hours,
          offSetX,
          offSetY,
          unitColor: getUnitColor(activity.UNIT),
        };
        return result;
      });
  };
  const fireRiskTimeLine = (data: any) =>
    (data || []).map((activity: any) => {
      const startMoment: any = moment(activity["BEGIN DATE"]);
      const endMoment = moment(activity["END DATE"]);
      return {
        numberOfUnits: endMoment.diff(startMoment, "hours", true),
        offSetX: moment(activity["BEGIN DATE"]).hours(),
        offSetY: activity.index,
        riskColor: activity["COLOR DESCRIPTION"],
      };
    });

  const week = ["1", "2", "3", "4", "5", "6"];

  const weekDate = [
    moment(activeDate).format("MMM D"),
    ...week.map((daysToAdd) =>
      moment(activeDate).add(daysToAdd, "d").format("MMM D")
    ),
  ];
  const twoWeek = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ];

  const twoWeekDate = [
    moment(activeDate).format("MMM D"),
    ...twoWeek.map((daysToAdd) =>
      moment(activeDate).add(daysToAdd, "d").format("MMM D")
    ),
  ];

  const view = () => {
    if (display === "day") {
      return (
        <Day
          day={moment(activeDate).format("ddd MMM D")}
          flexHeader={flexHeader}
          graph={Styles.graph}
          backgroundDay={Styles.backgroundDay}
          days={1}
          timeLine={timeLine(activies, moment(activeDate).format("MMM D"))}
        />
      );
    } else if (display === "week") {
      return weekDate.map((day) => {
        return (
          <Day
            key={day}
            day={day}
            flexHeader={flexHeader}
            graph={Styles.graph}
            backgroundDay={Styles.backgroundDay}
            days={7}
            timeLine={timeLine(
              props.print ? props.fullActivies : activies || [],
              day
            )}
            print={props.print}
            chunkIndex={props.chunkIndex}
          />
        );
      });
    } else if (display === "2weeks") {
      return twoWeekDate.map((day) => {
        return (
          <Day
            key={day}
            day={day}
            flexHeader={flexHeader}
            graph={Styles.graph}
            backgroundDay={Styles.backgroundDay}
            days={14}
            timeLine={timeLine(activies || [], day)}
          />
        );
      });
    } else {
      return <> </>;
      // <LoadingNotifier />;
    }
  };

  const riskView = () => {
    if (display === "day") {
      return (
        // <RiskDay
        //   day={moment(activeDate).format('ddd D')}
        //   flexHeader={flexHeader}
        //   graph={Styles.graph}
        //   backgroundDay={Styles.backgroundDay}
        //   days={1}
        //   timeLine={fireRiskTimeLine(riskData || [])}
        // />
        <></>
      );
    } else if (display === "week") {
      return weekDate.map((day) => {
        return (
          // <RiskDay
          //   key={day}
          //   day={day}
          //   flexHeader={flexHeader}
          //   graph={Styles.graph}
          //   backgroundDay={Styles.backgroundDay}
          //   days={7}
          //   timeLine={fireRiskTimeLine(riskData || [])}
          // />
          <></>
        );
      });
    } else if (display === "2weeks") {
      return twoWeekDate.map((day) => {
        return (
          // <RiskDay
          //   key={day}
          //   day={day}
          //   flexHeader={flexHeader}
          //   graph={Styles.graph}
          //   backgroundDay={Styles.backgroundDay}
          //   days={14}
          //   timeLine={fireRiskTimeLine(riskData || [])}
          // />
          <></>
        );
      });
    } else {
      return;
      <></>;
      // <LoadingNotifier />;
    }
  };

  const riskCodes = (codes: string) => {
    if (!codes) {
      return "";
    } else {
      return codes.split(" ").map((code) => {
        return (
          <p key={code} style={{ paddingLeft: "32px" }}>
            {/* {riskCodeLookup(code)} */}
          </p>
        );
      });
    }
  };

  const activityDate = (activity: any) => {
    try {
      const start = activity.START_DATE.split(" ");
      const end = activity.END_DATE.split(" ");
      if (start[0] === end[0]) {
        return start[0];
      } else {
        return `${start[0]} - ${end[0]}`;
      }
    } catch (err) {
      return "";
    }
  };

  const activityTime = (activity: any) => {
    try {
      const start = activity.START_DATE.split(" ");
      const end = activity.END_DATE.split(" ");
      return `${start[1]} - ${end[1]}`;
    } catch (err) {
      return "";
    }
  };

  return (
    <>
      <Grid container direction="row">
        <Grid item xs={3} className={!props.print ? Styles.activities : ""}>
          {props.chunkIndex === 0 && (
            <div className={flexHeader}>Activities</div>
          )}
          {(props.activies || []).map((activity: any) => (
            <HtmlTooltip
              key={Math.random()}
              placement="right"
              title={
                <React.Fragment>
                  <p>
                    <strong>{activity.ACTIVITY_NAME}</strong>
                  </p>
                  <p>
                    <img
                      // src={DateIcon}
                      alt="Date"
                      style={{ verticalAlign: "middle", paddingRight: 8 }}
                    />
                    {activityDate(activity)}
                  </p>
                  <p>
                    <img
                      // src={TimeIcon}
                      alt="Time"
                      style={{ verticalAlign: "middle", paddingRight: 8 }}
                    />
                    {activityTime(activity)}
                  </p>
                  <p>
                    <img
                      // src={IdIcon}
                      alt="Id"
                      style={{ verticalAlign: "middle", paddingRight: 8 }}
                    />
                    {activity.ACTIVITY_ID}
                  </p>
                  <p>
                    <img
                      // src={UnitsIcon}
                      alt="Unit"
                      style={{ verticalAlign: "middle", paddingRight: 8 }}
                    />
                    Unit: {activity.UNIT}
                  </p>
                  <p>
                    <img
                      // src={GroupsIcon}
                      alt="Work Group"
                      style={{ verticalAlign: "middle", paddingRight: 8 }}
                    />
                    Work Group: {activity.WORK_GROUP_NAME}
                  </p>
                  <p>
                    <img
                      // src={RiskIcon}
                      alt="Risks"
                      style={{ verticalAlign: "middle", paddingRight: 8 }}
                    />
                    Risk Codes
                  </p>
                  {riskCodes(activity.WORK_PLN_FACTOR)}
                </React.Fragment>
              }
            >
              <div
                key={activity.ACTIVITY_ID}
                className={flexCell}
                style={{ zIndex: 6, position: "relative" }}
              >
                {activity.ACTIVITY_NAME}
              </div>
            </HtmlTooltip>
          ))}
        </Grid>
        <Grid
          container
          item
          xs={9}
          className={!props.print ? Styles.graphContainer : ""}
        >
          {view()}
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid
          item
          xs={3}
          className={!props.print ? Styles.activities : Styles.activitiesPrint}
        >
          {risks.map((activity: any, index: any) => (
            <div key={activity.ACTIVITY_ID} className={flexCell}>
              {activity}
            </div>
          ))}
        </Grid>
        <Grid item xs={9} className={!props.print ? Styles.graphContainer : ""}>
          {riskView()}
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles({
  flexAlign: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
  },
  backgroundDay: {
    "&:nth-child(odd)": {
      backgroundColor: "white",
    },
    "&:nth-child(even)": {
      backgroundColor: "#f9f9f9",
    },
  },
  activities: {
    borderRight: "3px solid #e6e6e6",
    borderBottom: "3px solid #e6e6e6",
    zIndex: 6,
  },
  activitiesPrint: {
    borderRight: "3px solid #e6e6e6",
  },
  header: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.33,
    height: 48,
    backgroundColor: "#e1e4ea",
    color: "#757575",
    borderBottom: "3px solid #e6e6e6",
    paddingLeft: 10,
  },
  name: {
    height: 32,
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1.33,
    padding: "10px 5px",
    "&:nth-child(odd)": {
      backgroundColor: "#e1e4ea",
    },
    "&:nth-child(even)": {
      backgroundColor: "#ffffff",
    },
  },
  graphContainer: {
    borderBottom: "3px solid #e6e6e6",
  },
  graph: {
    position: "relative",
    height: "100%",
    zIndex: 5,
  },
  footerName: {
    padding: 5,
    fontSize: 14,
    "&:nth-child(odd)": {
      backgroundColor: "#ffff",
    },
    "&:nth-child(even)": {
      backgroundColor: "#f7f8f9",
    },
  },
});

export default ScheduleGannet;
