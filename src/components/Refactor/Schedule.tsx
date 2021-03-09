import React, { useState, useEffect, FC } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getScheduleGantt } from "../../requests/podRequests";
// import { getParagonDetails } from "../../requests/podRequests";
// import { Plant } from "../../models/plant-status/plant.model";
// import { unique } from "../../utils";
// import  Calendar from "./calender";

import moment from "moment";
import clsx from "clsx";
import assert from "assert";

import { makeStyles } from "@material-ui/core/styles";
import ScheduleGantt from "./ScheduleGantt";
import ScheduleDropDownUnit from "./ScheduleDropDownUnit";
// import DropDownCheckBox from "./shared/DropDownCheckBox";
// import { updateSchLoaded } from "../../redux/actions/pod/actions";
import {
  Card,
  CardContent,
  Box,
  Button,
  IconButton,
  Popover,
} from "@material-ui/core";
//@ts-ignore
// import { ReactComponent as TableIcon } from "../../icons/table.svg";
//@ts-ignore
// import { ReactComponent as Left } from "../../icons/pod/angle-left-gray.svg";
//@ts-ignore
// import { ReactComponent as Right } from "../../icons/pod/angle-right-gray.svg";
//@ts-ignore
// import { ReactComponent as Down } from "../../icons/pod/down-blue.svg";
// import LoadingNotifier from "../LoadingNotifier";
// import OutSideClick from '../../components/shared/OutSideClick';

let checkOutSide = true;

const Container: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    height="21px"
    marginBottom="32px"
  >
    {children}
  </Box>
);

interface ScheduleProps {
  defaultTab: string;
  print?: boolean;
}
const Schedule = (props: ScheduleProps) => {
  const [active, setActive] = useState<string>(props.defaultTab);
  const [data, getGanntData] = useState<any>([
    {
      ACTIVITY_ID: "01935473-03",
      ACTIVITY_NAME:
        "SEB (LR) REVIEW ONE-TIME RESULTS LUBE OIL COOLER TUBES-IR IF REQUIRED",
      START_DATE: "2020/07/15 21:00:00",
      END_DATE: "2020/07/15 23:00:00",
      WORK_GROUP_NAME: "ES",
      UNIT: "00",
      WORK_PLN_FACTOR: "F2 EN RS NR",
    },
    {
      ACTIVITY_ID: "RHR*SWPUMPDSCHSTOP*Z",
      ACTIVITY_NAME:
        "MM 1E12-F332D CLEAN UP AFTER  DISASSEMBLE/INSPECT/REPAIR VALVE",
      START_DATE: "2020/07/16 07:00:00",
      END_DATE: "2020/07/16 13:00:00",
      WORK_GROUP_NAME: "MM",
      WORK_PLN_FACTOR: "F1 RM L2 NR",
    },
    {
      ACTIVITY_ID: "01322927-01F",
      ACTIVITY_NAME: "2DG024 TACK IN VALVE",
      START_DATE: "2020/07/17 16:01:00",
      END_DATE: "2020/07/17 18:01:00",
      WORK_GROUP_NAME: "MM",
      UNIT: "02",
      WORK_PLN_FACTOR: "F2 WE RS NR L1 HS",
    },
    {
      ACTIVITY_ID: "01322927-01E",
      ACTIVITY_NAME: "2DG024 CUT PIPE TO FIT, PREP PIPE ENDS FOR WELDING",
      START_DATE: "2020/07/17 13:01:00",
      END_DATE: "2020/07/17 16:01:00",
      WORK_GROUP_NAME: "MM",
      UNIT: "02",
      WORK_PLN_FACTOR: "F2 WE RS NR L1 HS",
    },
    {
      ACTIVITY_ID: "01322927-01C",
      ACTIVITY_NAME: "2DG024 CUT OUT VALVE",
      START_DATE: "2020/07/17 11:01:00",
      END_DATE: "2020/07/17 13:01:00",
      WORK_GROUP_NAME: "MM",
      UNIT: "02",
      WORK_PLN_FACTOR: "F2 WE RS NR L1 HS",
    },
    {
      ACTIVITY_ID: "01322927-01B",
      ACTIVITY_NAME: "2DG024 WALK C/O, DISASSEMBLE VALVE",
      START_DATE: "2020/07/17 07:01:00",
      END_DATE: "2020/07/17 09:01:00",
      WORK_GROUP_NAME: "MM",
      UNIT: "02",
      WORK_PLN_FACTOR: "F2 WE RS NR L1 HS",
    },
    {
      ACTIVITY_ID: "01881463-01Z",
      ACTIVITY_NAME: "MM 2CP40MD CLEAN UP AFTER REPLACE FILTER ELEMENT",
      START_DATE: "2020/07/18 07:01:00",
      END_DATE: "2020/07/18 09:01:00",
      WORK_GROUP_NAME: "MM",
      UNIT: "02",
      WORK_PLN_FACTOR: "CC",
    },
    {
      ACTIVITY_ID: "U2 LOAD DROP I210",
      ACTIVITY_NAME:
        "OPS INSERT CONTROL ROD 30-31 AND ADJUST FLOW CONTROL LINE IN PREP FOR MAINT.",
      START_DATE: "2020/07/20 11:00:00",
      END_DATE: "2020/07/20 13:00:00",
      WORK_GROUP_NAME: "OP",
      UNIT: "02",
      WORK_PLN_FACTOR: "RM",
    },
    {
      ACTIVITY_ID: "01322927-01D",
      ACTIVITY_NAME: "**CONTINGENCY**  2DG024 DECISION POINT FOR PIPE MOVEMENT",
      START_DATE: "2020/07/21 13:01:00",
      END_DATE: "2020/07/21 16:01:00",
      WORK_GROUP_NAME: "MM",
      UNIT: "02",
      WORK_PLN_FACTOR: "F2 WE RS NR L1 HS",
    },
    {
      ACTIVITY_ID: "U2 LOAD DROP I210",
      ACTIVITY_NAME:
        "OPS INSERT CONTROL ROD 30-31 AND ADJUST FLOW CONTROL LINE IN PREP FOR MAINT.",
      START_DATE: "2020/08/07 11:00:00",
      END_DATE: "2020/08/07 13:00:00",
      WORK_GROUP_NAME: "OP",
      UNIT: "02",
      WORK_PLN_FACTOR: "RM",
    },
    {
      ACTIVITY_ID: "04866625-01L",
      ACTIVITY_NAME: 'MM  "0" DG FILL ENGINE OIL',
      START_DATE: "2020/08/08 21:00:00",
      END_DATE: "2020/08/08 02:00:00",
      WORK_GROUP_NAME: "MM",
      UNIT: "00",
      WORK_PLN_FACTOR: "RS L2 VS IS ES HS",
    },
    {
      ACTIVITY_ID: "00181510-01-01-311",
      ACTIVITY_NAME: "LOS-DC-W1 ATT F U2 125VDC DIV I BATTERY/BREAKER CHECKS",
      START_DATE: "2020/08/09 00:00:00",
      END_DATE: "2020/08/09 01:00:00",
      WORK_GROUP_NAME: "OP",
      UNIT: "02",
      WORK_PLN_FACTOR: "HH NF",
    },
    {
      ACTIVITY_ID: "DG*VLV*BRIDGES*C",
      ACTIVITY_NAME:
        "MM 2E22-S001 SUPPORT/PERFORM APPLICABLE START,RUN, HOLDS, & CHECKS PER LMS-DG-01",
      START_DATE: "2020/08/13 23:01:00",
      END_DATE: "2020/08/13 07:01:00",
      WORK_GROUP_NAME: "MM",
      WORK_PLN_FACTOR: "EN F2 L2 VS CR IS ES NR",
    },
    {
      ACTIVITY_ID: "DG*VLV*BRIDGES*Z",
      ACTIVITY_NAME:
        "MM 2E22-S001 CLEAN UP AFTER PERFORM  INSPECTION ON '2B' MAIN EMERGENCY D/G",
      START_DATE: "2020/08/13 07:01:00",
      END_DATE: "2020/08/13 19:01:00",
      WORK_GROUP_NAME: "MM",
      WORK_PLN_FACTOR: "EN F2 L2 VS CR IS ES NR",
    },
    {
      ACTIVITY_ID: "DG*VLV*BRIDGES*BN",
      ACTIVITY_NAME: "MM 2E22-S001 FILL ENGINE OIL",
      START_DATE: "2020/07/09 18:01:00",
      END_DATE: "2020/07/09 23:01:00",
      WORK_GROUP_NAME: "MM",
      WORK_PLN_FACTOR: "EN F2 L2 VS CR IS ES NR",
    },
    {
      ACTIVITY_ID: "01935473-03",
      ACTIVITY_NAME:
        "SEE (LR) REVIEW RESULTS LUBE OIL COOLER TUBES-IR IF REQUIRED",
      START_DATE: "2020/08/01 21:00:00",
      END_DATE: "2020/08/01 23:00:00",
      WORK_GROUP_NAME: "ES",
      UNIT: "00",
      WORK_PLN_FACTOR: "F2 EN RS NR",
    },
  ]);
  const [riskData, setRiskData] = useState<any>(null);
  const [newRiskData, setNewRiskData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeDate, setActiveDate] = useState(moment().format("YYYY/MM/DD"));
  const [paragonActiveDate, setParagonActiveDate] = useState(
    moment.utc().format("DD-MMM-YYYY")
  );
  // const paragonSites = useSelector((state: any) => state.pod.schParagonSites);
  // const dispatch = useDispatch();
  const [doneParagFetch, setDoneParagFetch] = React.useState(false);
  const [doneGanttFetch, setDoneGanntFetch] = React.useState(false);
  const [newData, setNewData] = useState<any>([
    {
      ACTIVITY_ID: "01935473-03",
      ACTIVITY_NAME:
        "SEB (LR) REVIEW ONE-TIME RESULTS LUBE OIL COOLER TUBES-IR IF REQUIRED",
      START_DATE: "2020/07/15 21:00:00",
      END_DATE: "2020/07/15 23:00:00",
      WORK_GROUP_NAME: "ES",
      UNIT: "00",
      WORK_PLN_FACTOR: "F2 EN RS NR",
    },
    {
      ACTIVITY_ID: "RHR*SWPUMPDSCHSTOP*Z",
      ACTIVITY_NAME:
        "MM 1E12-F332D CLEAN UP AFTER  DISASSEMBLE/INSPECT/REPAIR VALVE",
      START_DATE: "2020/07/16 07:00:00",
      END_DATE: "2020/07/16 13:00:00",
      WORK_GROUP_NAME: "MM",
      WORK_PLN_FACTOR: "F1 RM L2 NR",
    },
    {
      ACTIVITY_ID: "01322927-01F",
      ACTIVITY_NAME: "2DG024 TACK IN VALVE",
      START_DATE: "2020/07/17 16:01:00",
      END_DATE: "2020/07/17 18:01:00",
      WORK_GROUP_NAME: "MM",
      UNIT: "02",
      WORK_PLN_FACTOR: "F2 WE RS NR L1 HS",
    },
    {
      ACTIVITY_ID: "01322927-01E",
      ACTIVITY_NAME: "2DG024 CUT PIPE TO FIT, PREP PIPE ENDS FOR WELDING",
      START_DATE: "2020/07/17 13:01:00",
      END_DATE: "2020/07/17 16:01:00",
      WORK_GROUP_NAME: "MM",
      UNIT: "02",
      WORK_PLN_FACTOR: "F2 WE RS NR L1 HS",
    },
    {
      ACTIVITY_ID: "01322927-01C",
      ACTIVITY_NAME: "2DG024 CUT OUT VALVE",
      START_DATE: "2020/07/17 11:01:00",
      END_DATE: "2020/07/17 13:01:00",
      WORK_GROUP_NAME: "MM",
      UNIT: "02",
      WORK_PLN_FACTOR: "F2 WE RS NR L1 HS",
    },
    {
      ACTIVITY_ID: "01322927-01B",
      ACTIVITY_NAME: "2DG024 WALK C/O, DISASSEMBLE VALVE",
      START_DATE: "2020/07/17 07:01:00",
      END_DATE: "2020/07/17 09:01:00",
      WORK_GROUP_NAME: "MM",
      UNIT: "02",
      WORK_PLN_FACTOR: "F2 WE RS NR L1 HS",
    },
    {
      ACTIVITY_ID: "01881463-01Z",
      ACTIVITY_NAME: "MM 2CP40MD CLEAN UP AFTER REPLACE FILTER ELEMENT",
      START_DATE: "2020/07/18 07:01:00",
      END_DATE: "2020/07/18 09:01:00",
      WORK_GROUP_NAME: "MM",
      UNIT: "02",
      WORK_PLN_FACTOR: "CC",
    },
    {
      ACTIVITY_ID: "U2 LOAD DROP I210",
      ACTIVITY_NAME:
        "OPS INSERT CONTROL ROD 30-31 AND ADJUST FLOW CONTROL LINE IN PREP FOR MAINT.",
      START_DATE: "2020/07/20 11:00:00",
      END_DATE: "2020/07/20 13:00:00",
      WORK_GROUP_NAME: "OP",
      UNIT: "02",
      WORK_PLN_FACTOR: "RM",
    },
    {
      ACTIVITY_ID: "01322927-01D",
      ACTIVITY_NAME: "**CONTINGENCY**  2DG024 DECISION POINT FOR PIPE MOVEMENT",
      START_DATE: "2020/07/21 13:01:00",
      END_DATE: "2020/07/21 16:01:00",
      WORK_GROUP_NAME: "MM",
      UNIT: "02",
      WORK_PLN_FACTOR: "F2 WE RS NR L1 HS",
    },
    {
      ACTIVITY_ID: "U2 LOAD DROP I210",
      ACTIVITY_NAME:
        "OPS INSERT CONTROL ROD 30-31 AND ADJUST FLOW CONTROL LINE IN PREP FOR MAINT.",
      START_DATE: "2020/08/07 11:00:00",
      END_DATE: "2020/08/07 13:00:00",
      WORK_GROUP_NAME: "OP",
      UNIT: "02",
      WORK_PLN_FACTOR: "RM",
    },
    {
      ACTIVITY_ID: "04866625-01L",
      ACTIVITY_NAME: 'MM  "0" DG FILL ENGINE OIL',
      START_DATE: "2020/08/08 21:00:00",
      END_DATE: "2020/08/08 02:00:00",
      WORK_GROUP_NAME: "MM",
      UNIT: "00",
      WORK_PLN_FACTOR: "RS L2 VS IS ES HS",
    },
    {
      ACTIVITY_ID: "00181510-01-01-311",
      ACTIVITY_NAME: "LOS-DC-W1 ATT F U2 125VDC DIV I BATTERY/BREAKER CHECKS",
      START_DATE: "2020/08/09 00:00:00",
      END_DATE: "2020/08/09 01:00:00",
      WORK_GROUP_NAME: "OP",
      UNIT: "02",
      WORK_PLN_FACTOR: "HH NF",
    },
    {
      ACTIVITY_ID: "DG*VLV*BRIDGES*C",
      ACTIVITY_NAME:
        "MM 2E22-S001 SUPPORT/PERFORM APPLICABLE START,RUN, HOLDS, & CHECKS PER LMS-DG-01",
      START_DATE: "2020/08/13 23:01:00",
      END_DATE: "2020/08/13 07:01:00",
      WORK_GROUP_NAME: "MM",
      WORK_PLN_FACTOR: "EN F2 L2 VS CR IS ES NR",
    },
    {
      ACTIVITY_ID: "DG*VLV*BRIDGES*Z",
      ACTIVITY_NAME:
        "MM 2E22-S001 CLEAN UP AFTER PERFORM  INSPECTION ON '2B' MAIN EMERGENCY D/G",
      START_DATE: "2020/08/13 07:01:00",
      END_DATE: "2020/08/13 19:01:00",
      WORK_GROUP_NAME: "MM",
      WORK_PLN_FACTOR: "EN F2 L2 VS CR IS ES NR",
    },
    {
      ACTIVITY_ID: "DG*VLV*BRIDGES*BN",
      ACTIVITY_NAME: "MM 2E22-S001 FILL ENGINE OIL",
      START_DATE: "2020/07/09 18:01:00",
      END_DATE: "2020/07/09 23:01:00",
      WORK_GROUP_NAME: "MM",
      WORK_PLN_FACTOR: "EN F2 L2 VS CR IS ES NR",
    },
    {
      ACTIVITY_ID: "01935473-03",
      ACTIVITY_NAME:
        "SEE (LR) REVIEW RESULTS LUBE OIL COOLER TUBES-IR IF REQUIRED",
      START_DATE: "2020/08/01 21:00:00",
      END_DATE: "2020/08/01 23:00:00",
      WORK_GROUP_NAME: "ES",
      UNIT: "00",
      WORK_PLN_FACTOR: "F2 EN RS NR",
    },
  ]);

  const [unitValue, setUnitValue] = React.useState("All");
  const [toggleUnit, setToggleUnit] = React.useState("");
  const [groupList, setGroupList] = React.useState<any>([]);
  const [selectedGroupList, setSelectedGroupList] = React.useState<any>([]);
  const [allGroupSelected, setAllGroupSelected] = React.useState<any>(false);

  // eslint-disable-next-line
  const [riskList, setRiskList] = React.useState<any>([
    "HR",
    "HH",
    "HT",
    "HI",
    "EV",
    "CC",
    "RM",
    "SW",
    "EN",
    "AR",
    "HS",
  ]);

  const [selectedRiskList, setSelectedRiskList] = React.useState<any>([]);
  const [allRiskSelected, setAllRiskSelected] = React.useState<any>(false);

  // const user = useSelector((state: any) => state.app.user);
  // const plants = useSelector(
  //   (state: any) => state.plantStatus.plants
  // ).sort((a: Plant, b: Plant) => (a.name > b.name ? 1 : -1));
  // const gotUser = user.createdAt;
  // const userPlant =
  //   plants.find((plant: Plant) => plant.id === user.plantID) || plants[0];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const getEndDate = (activeDate: any, active: any) => {
    switch (active) {
      case "day":
        return `${activeDate} 22:59:59`;
      case "week":
        return `${moment(activeDate)
          .add(6, "d")
          .format("YYYY/MM/DD")} 22:59:59`;
      default:
        return `${moment(activeDate)
          .add(13, "d")
          .format("YYYY/MM/DD")} 22:59:59`;
    }
  };
  const getParagonEndDate = (activeDate: any, active: any) => {
    switch (active) {
      case "day":
        return `${activeDate}`;
      case "week":
        return `${moment(activeDate).add(6, "d").format("DD-MMM-YYYY")}`;
      default:
        return `${moment(activeDate).add(13, "d").format("DD-MMM-YYYY")}`;
    }
  };

  // const getParagonDetailsAll = async (
  //   stationArr: any,
  //   startDate: string,
  //   endDate: string
  // ) => {
  //   if (stationArr.length === 1) {
  //     return getParagonDetails(stationArr[0], startDate, endDate);
  //   } else {
  //     return Promise.all([
  //       getParagonDetails(stationArr[0], startDate, endDate),
  //       getParagonDetails(stationArr[1], startDate, endDate),
  //     ]).then((values: any) => {
  //       const res1 =
  //         values && values[0].WS_RISK_DATA ? values[0].WS_RISK_DATA.VALUE : [];
  //       const res2 =
  //         values && values[1].WS_RISK_DATA ? values[1].WS_RISK_DATA.VALUE : [];

  //       return { WS_RISK_DATA: { VALUE: [...res1, ...res2] } };
  //     });
  //   }
  // };

  useEffect(() => {
    // if (gotUser) {
    //   setLoading(true);
    //   getGanntData([]);
    //   setNewData([]);
    //   setUnitValue("All");
    //   setSelectedGroupList([]);
    //   setSelectedRiskList([]);
    //   setAllRiskSelected(false);
    //   setAllGroupSelected(false);
    // getScheduleGantt(
    //   userPlant.codeName,
    //   `${moment(activeDate).subtract(1, "d").format("YYYY/MM/DD 23:00:00")}`,
    //   getEndDate(activeDate, active)
    // )
    //   .then((res) => {
    //     const converted = (res.VALUE ? res.VALUE : []).map(
    //       (activity: any, index: any) => {
    //         return { index: index, ...activity };
    //       }
    //     );
    //     getGanntData(converted);
    //     setNewData(converted);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   })
    //   .finally(() => setDoneGanntFetch(true));
    // getParagonDetailsAll(
    //   paragonSites[userPlant.codeName],
    //   paragonActiveDate,
    //   getParagonEndDate(paragonActiveDate, active)
    // )
    //   .then((res: any) => {
    //     var data = (res.WS_RISK_DATA ? res.WS_RISK_DATA.VALUE : []).filter(
    //       (val: any) =>
    //         val.DESCRIPTION.toUpperCase() === "FIRE RISK" ||
    //         val.DESCRIPTION === "Online Safety Functions" ||
    //         val.DESCRIPTION === "Online Plant Transients"
    //     );
    //     const converted = data.map((riskdata: any, index: any) => {
    //       var i: any;
    //       if (riskdata.DESCRIPTION.toUpperCase() === "FIRE RISK") {
    //         i = 0;
    //       }
    //       if (riskdata.DESCRIPTION === "Online Safety Functions") {
    //         i = 1;
    //       }
    //       if (riskdata.DESCRIPTION === "Online Plant Transients") {
    //         i = 2;
    //       }
    //       setLoading(false);
    //       return { index: i, ...riskdata };
    //     });
    //     setRiskData(converted);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   })
    //   .finally(() => setDoneParagFetch(true));
    // }
  }, [
    // userPlant.codeName,
    activeDate,
    active,
    // paragonActiveDate,
    // gotUser,
    // paragonSites,
  ]);

  useEffect(() => {
    let groupLists = data
      ? [...data.map((each: any) => each.WORK_GROUP_NAME)]
      : [];

    // setGroupList(groupLists ? groupLists.filter(unique) : []);
    setNewRiskData(filterRiskUnit());

    // eslint-disable-next-line
  }, [data]);

  React.useEffect(() => {
    if (doneParagFetch && doneGanttFetch) {
      // dispatch(updateSchLoaded(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doneParagFetch, doneGanttFetch]);

  const handleLeft = () => {
    if (active === "day") {
      setActiveDate((prevDay) =>
        moment(prevDay).subtract(1, "d").format("YYYY/MM/DD")
      );
      setParagonActiveDate((prevDay) =>
        moment(prevDay).subtract(1, "d").format("DD-MMM-YYYY")
      );
    } else if (active === "week") {
      setActiveDate((prevDay) =>
        moment(prevDay).subtract(6, "d").format("YYYY/MM/DD")
      );
      setParagonActiveDate((prevDay) =>
        moment(prevDay).subtract(6, "d").format("DD-MMM-YYYY")
      );
    } else if (active === "2weeks") {
      setActiveDate((prevDay) =>
        moment(prevDay).subtract(13, "d").format("YYYY/MM/DD")
      );
      setParagonActiveDate((prevDay) =>
        moment(prevDay).subtract(13, "d").format("DD-MMM-YYYY")
      );
    }
  };

  const handleRight = () => {
    if (active === "day") {
      setActiveDate((prevDay) =>
        moment(prevDay).add(1, "d").format("YYYY/MM/DD")
      );
      setParagonActiveDate((prevDay) =>
        moment(prevDay).add(1, "d").format("DD-MMM-YYYY")
      );
    } else if (active === "week") {
      setActiveDate((prevDay) =>
        moment(prevDay).add(6, "d").format("YYYY/MM/DD")
      );
      setParagonActiveDate((prevDay) =>
        moment(prevDay).add(6, "d").format("DD-MMM-YYYY")
      );
    } else if (active === "2weeks") {
      setActiveDate((prevDay) =>
        moment(prevDay).add(13, "d").format("YYYY/MM/DD")
      );
      setParagonActiveDate((prevDay) =>
        moment(prevDay).add(13, "d").format("DD-MMM-YYYY")
      );
    }
  };

  const filterUnit = (data: any, value: any, otherFilter?: any) => {
    console.log("value", value);
    checkOutSide = false;
    setUnitValue(value);

    if (otherFilter) {
      if (value === "Unit 1") {
        let filterData = data.filter((each: any) => each.UNIT === "01");

        return filterData;
      } else if (value === "Unit 2") {
        let filterData = data.filter((each: any) => each.UNIT === "02");

        return filterData;
      } else if (value === "Unit 3") {
        let filterData = data.filter((each: any) => each.UNIT === "03");

        return filterData;
      } else if (value === "Common") {
        let filterData = data.filter(
          (each: any) => each.UNIT === "00" || !each.UNIT //each.UNIT === '01' || each.UNIT === '02'
        );

        return filterData;
      } else {
        let filterData: any = [...data];

        return filterData;
      }
    } else {
      if (value === "Unit 1") {
        let filterData = data.filter((each: any) => each.UNIT === "01");
        filterData = handleSelectListGroupList(filterData);
        filterData = handleSelectListRiskList(filterData);
        setNewData(filterData);
      } else if (value === "Unit 2") {
        let filterData = data.filter((each: any) => each.UNIT === "02");
        filterData = handleSelectListGroupList(filterData);
        filterData = handleSelectListRiskList(filterData);

        setNewData(filterData);
      } else if (value === "Unit 3") {
        let filterData = data.filter((each: any) => each.UNIT === "03");
        filterData = handleSelectListGroupList(filterData);
        filterData = handleSelectListRiskList(filterData);

        setNewData(filterData);
      } else if (value === "Common") {
        let filterData = data.filter(
          (each: any) => each.UNIT === "00" || !each.UNIT
        );
        filterData = handleSelectListGroupList(filterData);
        filterData = handleSelectListRiskList(filterData);
        setNewData(filterData);
      } else {
        let filterData: any = [...data];
        filterData = handleSelectListGroupList(filterData);
        filterData = handleSelectListRiskList(filterData);
        setNewData(filterData);
      }
    }
  };

  const filterRiskUnit = () => {
    if (unitValue === "Unit 1") {
      return riskData.filter(
        (val: any) => val["RESULT DESCRIPTION"].split("-").pop() === "Unit1"
      );
    } else if (unitValue === "Unit 2") {
      return riskData.filter(
        (val: any) => val["RESULT DESCRIPTION"].split("-").pop() === "Unit2"
      );
    } else if (unitValue === "Common") {
      return riskData.filter(
        (val: any) =>
          val["RESULT DESCRIPTION"].split("-").pop() === "Unit1" ||
          val["RESULT DESCRIPTION"].split("-").pop() === "Unit2"
      );
    } else {
      return riskData;
    }
  };

  const date = moment(activeDate).format("MMM D");

  // returns chunk of array by given range
  const getDataChunks = (i: number, size: number, list: any[]) =>
    list.slice(i, i + size);

  // returns an array of indexes to get chunk of data
  const getDataChunkIndexes = (size: number, list: any[]) => {
    let i = 0;
    const indexArr = [];
    while (i < list.length) {
      indexArr.push(i);
      i += size;
    }
    return props.print ? indexArr : [0];
  };

  const closeMethod = () => {
    setTimeout(() => {
      if (checkOutSide) {
        setToggleUnit("");
      }

      checkOutSide = true;
    }, 300);
  };

  const handleToggleUnit = (name: string) => {
    checkOutSide = false;
    if (toggleUnit === name) {
      setToggleUnit("");
    } else {
      setToggleUnit(name);
    }
  };

  const compare = (obj1: any, obj2: any) => {
    try {
      assert.deepStrictEqual(obj1, obj2);
      return true;
    } catch (err) {
      return false;
    }
  };

  const compareAll = (arj1: any, arj2: any, setGroup: any) => {
    if (compare(arj1.sort(), arj2.sort())) {
      setGroup(true);
    } else {
      setGroup(false);
    }
  };

  const handleSelectListGroupList = (data: any, value?: any, all?: any) => {
    checkOutSide = false;
    let newSelectedGroupList = [
      ...data.map((each: any) => each.WORK_GROUP_NAME),
    ];
    // newSelectedGroupList = newSelectedGroupList.filter(unique);
    if (!value) {
      let dubGroupList = [...selectedGroupList];
      if (dubGroupList.length === 0) {
        // compareAll(
        //   newSelectedGroupList,
        //   selectedGroupList,
        //   setAllGroupSelected
        // );
        return data;
      } else {
        // compareAll(
        //   newSelectedGroupList,
        //   selectedGroupList,
        //   setAllGroupSelected
        // );
        return data.filter(
          (each: any) => dubGroupList.indexOf(each.WORK_GROUP_NAME) !== -1
        );
      }
    } else {
      if (all) {
        let dubGroupList = [...selectedGroupList];

        if (compare(newSelectedGroupList.sort(), dubGroupList.sort())) {
          dubGroupList = [];
          setAllGroupSelected(false);
          setSelectedGroupList([...dubGroupList]);
        } else {
          setAllGroupSelected(true);
          setSelectedGroupList([...newSelectedGroupList]);
        }
        let filterData = filterUnit([...data], unitValue, true);
        filterData = handleSelectListRiskList([...filterData]);
        setNewData([...filterData]);
      } else {
        if (selectedGroupList.indexOf(value) !== -1) {
          let dubGroupList = [...selectedGroupList];
          dubGroupList = dubGroupList.filter((each: any) => each !== value);
          setSelectedGroupList([...dubGroupList]);
          compareAll(newSelectedGroupList, dubGroupList, setAllGroupSelected);
          if (dubGroupList.length === 0) {
            let filterData = filterUnit(data, unitValue, true);
            filterData = handleSelectListRiskList(filterData);
            setNewData([...filterData]);
          } else {
            let filterData = data.filter(
              (each: any) => dubGroupList.indexOf(each.WORK_GROUP_NAME) !== -1
            );

            filterData = filterUnit(filterData, unitValue, true);
            filterData = handleSelectListRiskList(filterData);
            setNewData([...filterData]);
          }
        } else {
          let dubGroupList = [...selectedGroupList];
          dubGroupList.push(value);
          compareAll(newSelectedGroupList, dubGroupList, setAllGroupSelected);
          setSelectedGroupList([...dubGroupList]);
          if (dubGroupList.length === 0) {
            let filterData = filterUnit(data, unitValue, true);
            filterData = handleSelectListRiskList(filterData);
            setNewData([...filterData]);
          } else {
            let filterData = data.filter(
              (each: any) => dubGroupList.indexOf(each.WORK_GROUP_NAME) !== -1
            );

            filterData = filterUnit(filterData, unitValue, true);
            filterData = handleSelectListRiskList(filterData);
            setNewData([...filterData]);
          }
        }
      }
    }
  };

  const handleSelectListRiskList = (data: any, value?: any, all?: any) => {
    checkOutSide = false;

    let newSelectedRiskList = riskList;

    if (!value) {
      let dubRiskList = [...selectedRiskList];
      let filterData: any = [];
      dubRiskList.forEach((each: any) => {
        data.forEach((one: any) => {
          if (one.WORK_PLN_FACTOR.indexOf(each) !== -1) {
            filterData.push(one.index);
          }
        });
      });
      compareAll(newSelectedRiskList, selectedRiskList, setAllRiskSelected);
      if (dubRiskList.length === 0) {
        return [...data];
      } else {
        return data.filter(
          (each: any) => filterData.indexOf(each.index) !== -1
        );
      }
    } else {
      if (all) {
        let dubRiskList = [...selectedRiskList];
        if (compare(newSelectedRiskList.sort(), dubRiskList.sort())) {
          setAllRiskSelected(false);
          setSelectedRiskList([]);
        } else {
          setAllRiskSelected(true);
          setSelectedRiskList([...newSelectedRiskList]);
        }
        let filterResultData = filterUnit(data, unitValue, true);
        filterResultData = handleSelectListGroupList(filterResultData);
        setNewData([...filterResultData]);
      } else {
        if (selectedRiskList.indexOf(value) !== -1) {
          let dubRiskList = [...selectedRiskList];
          dubRiskList = dubRiskList.filter((each: any) => each !== value);
          compareAll(newSelectedRiskList, dubRiskList, setAllRiskSelected);
          setSelectedRiskList([...dubRiskList]);
          let filterData: any = [];
          dubRiskList.forEach((each: any) => {
            data.forEach((one: any) => {
              if (one.WORK_PLN_FACTOR.indexOf(each) !== -1) {
                filterData.push(one.index);
              }
            });
          });

          if (dubRiskList.length === 0) {
            let filterResultData = filterUnit(data, unitValue, true);
            filterResultData = handleSelectListGroupList(filterResultData);
            setNewData([...filterResultData]);
          } else {
            let filterResultData = data.filter(
              (each: any) => filterData.indexOf(each.index) !== -1
            );
            filterResultData = filterUnit(filterResultData, unitValue, true);
            filterResultData = handleSelectListGroupList(filterResultData);
            setNewData([...filterResultData]);
          }
        } else {
          let dubRiskList = [...selectedRiskList];
          dubRiskList.push(value);
          compareAll(newSelectedRiskList, dubRiskList, setAllRiskSelected);
          setSelectedRiskList([...dubRiskList]);

          let filterData: any = [];
          dubRiskList.forEach((each: any) => {
            data.forEach((one: any) => {
              if (one.WORK_PLN_FACTOR.indexOf(each) !== -1) {
                filterData.push(one.index);
              }
            });
          });

          if (dubRiskList.length === 0) {
            let filterResultData = filterUnit(data, unitValue, true);
            filterResultData = handleSelectListGroupList(filterResultData);
            setNewData([...filterResultData]);
          } else {
            let filterResultData = data.filter(
              (each: any) => filterData.indexOf(each.index) !== -1
            );

            filterResultData = filterUnit(filterResultData, unitValue, true);
            filterResultData = handleSelectListGroupList(filterResultData);
            setNewData([...filterResultData]);
          }
        }
      }
    }
  };

  const Styles = useStyles();
  const open = Boolean(anchorEl);

  return (
    <Card classes={{ root: Styles.card }}>
      <CardContent id="schtableheader">
        <Container>
          <Box display="flex" alignItems="center">
            {/* <TableIcon /> */}
            <div className={Styles.title}>Work Schedule</div>
          </Box>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <div className={Styles.timestamp}>{`Last updated ${moment().format(
              "L HH:mm"
            )}`}</div>
          </Box>
        </Container>
        <Container>
          <Box display="flex" alignItems="center">
            <Button
              className={clsx(Styles.button, {
                [Styles.active]: active === "day",
              })}
              onClick={() => setActive("day")}
            >
              Day
            </Button>
            <Button
              className={clsx(Styles.button, {
                [Styles.active]: active === "week",
              })}
              onClick={() => setActive("week")}
            >
              Week
            </Button>
            <Button
              className={clsx(Styles.button, {
                [Styles.active]: active === "2weeks",
              })}
              onClick={() => setActive("2weeks")}
            >
              2 Week
            </Button>
          </Box>
          <Box display="flex" alignItems="center" marginRight="10%">
            <p style={{ margin: 10 }}>{date}</p>
            <IconButton className={Styles.buttonIcon} onClick={handleLeft}>
              {/* <Left /> */}
            </IconButton>
            <IconButton className={Styles.buttonIcon} onClick={handleRight}>
              {/* <Right /> */}
            </IconButton>
          </Box>

          <Box display="flex" justifyContent="flex-end" alignItems="center">
            {/* <OutSideClick onClose={closeMethod}> */}
            <Button
              className={clsx(Styles.button, Styles.buttonCustom)}
              onClick={(e) => {
                handleClick(e);
                handleToggleUnit("unit");
              }}
            >
              {unitValue}
              {/* <Down style={{ marginLeft: 20 }} /> */}
            </Button>
            {toggleUnit === "unit" && data && data.length !== 0 && (
              <Popover
                id={"all-popover"}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <ScheduleDropDownUnit
                  value={unitValue}
                  handleChange={filterUnit}
                  data={data}
                  handleToggleUnit={handleToggleUnit}
                  getColor={""}
                  type={"unit"}
                />
              </Popover>
            )}
            {/* </OutSideClick>
            <OutSideClick onClose={closeMethod}> */}
            <Button
              className={clsx(Styles.button, Styles.buttonCustom)}
              onClick={(e) => {
                handleClick(e);
                handleToggleUnit("workGroup");
              }}
            >
              Filter Work Group
              {/* <Down /> */}
            </Button>
            {toggleUnit === "workGroup" && data && data.length !== 0 && (
              <Popover
                id={"workGroup-popover"}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                {/* <DropDownCheckBox
                  title="Filter Work Group"
                  handleToggleUnit={handleToggleUnit}
                  type={"workGroup"}
                  list={groupList}
                  selectedList={selectedGroupList}
                  handleSelectList={handleSelectListGroupList}
                  data={data}
                  allOptionText={"All workgroups"}
                  allOptionSelected={allGroupSelected}
                /> */}
              </Popover>
            )}
            {/* </OutSideClick>
            <OutSideClick onClose={closeMethod}> */}
            <Button
              className={clsx(Styles.button, Styles.buttonCustom)}
              onClick={(e) => {
                handleClick(e);
                handleToggleUnit("riskType");
              }}
            >
              Filter Risk Type
              {/* <Down /> */}
            </Button>
            {toggleUnit === "riskType" && data && data.length !== 0 && (
              <Popover
                id={"riskType-popover"}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                {/* <DropDownCheckBox
                  title="Filter Risk Type"
                  handleToggleUnit={handleToggleUnit}
                  type={"riskType"}
                  list={riskList}
                  selectedList={selectedRiskList}
                  handleSelectList={handleSelectListRiskList}
                  data={data}
                  allOptionText={"All risks"}
                  allOptionSelected={allRiskSelected}
                /> */}
              </Popover>
            )}
            {/* </OutSideClick> */}
          </Box>
        </Container>
      </CardContent>

      {loading && !props.print ? (
        ""
      ) : // <LoadingNotifier />
      newData && newData.length !== 0 ? (
        getDataChunkIndexes(10, newData).map((i) => {
          return (
            <div className="schtable1" key={i}>
              <ScheduleGantt
                display={active}
                activies={props.print ? getDataChunks(i, 10, newData) : newData}
                activeDate={activeDate}
                riskData={newRiskData}
                print={props.print}
                chunkIndex={i}
                fullActivies={newData}
              />
            </div>
          );
        })
      ) : (
        <div className={Styles.blank}>
          <p>no schedule for this station</p>
        </div>
      )}
      <div className="schtable1">
        <ScheduleGantt
          display={active}
          activies={newData}
          activeDate={activeDate}
          riskData={newRiskData}
          print={props.print}
          // chunkIndex={i}
          fullActivies={newData}
        />
      </div>
      {/* <Calendar /> */}
    </Card>
  );
};

const useStyles = makeStyles({
  card: {
    borderRadius: 8,
    boxShadow: "0 2px 8px 0 #07122533",
    backgroundColor: "white",
    marginBottom: 24,
  },
  title: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#373737",
    marginLeft: 8,
  },
  timestamp: {
    fontSize: "13px",
    fontStyle: "italic",
    color: "#757575",
    paddingRight: "6px",
  },
  button: {
    fontSize: 14,
    lineHeight: 1.14,
    letterSpacing: 0.25,
    backgroundColor: "#e1e4ea",
    color: "#757575",
    margin: 4,
  },
  buttonCustom: {
    backgroundColor: "#eff5ff",
    color: "#373737 ",
    minWidth: 130,
  },
  active: {
    backgroundColor: "#005df8",
    color: "white",
    "&:hover": {
      backgroundColor: "#005df8",
    },
  },
  buttonIcon: {
    padding: 0,
    margin: 4,
  },
  // dropDownUnit: {
  //   position: 'absolute',
  //   zIndex: 10,
  //   backgroundColor: 'white'
  // },
  blank: {
    fontSize: 18,
    marginTop: 40,
    margin: "40px auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  // DropDownCheckBoxGroup: {
  //   position: 'absolute',
  //   zIndex: 10,
  //   backgroundColor: 'white'
  // },
  // DropDownCheckBoxRisk: {
  //   position: 'absolute',
  //   zIndex: 10,
  //   backgroundColor: 'white'
  // }
});

export default Schedule;
