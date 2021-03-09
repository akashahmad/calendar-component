import moment_1 from "moment";

const mockP6Tasks = [
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
];
export default (start, end) => {
  //   const take_1 = [];
  //   const shuffle_1 = [];
  const startDate = moment_1.default(start, "YYYY/MM/DD kk:mm:ss");
  const endDate = moment_1.default(end, "YYYY/MM/DD kk:mm:ss");
  const days = endDate.diff(startDate, "days");
  const numTasks = Math.floor(Math.random() * mockP6Tasks.length) + 1;
  const tasks = mockP6Tasks;
  //   const tasks = take_1
  //     .default(shuffle_1.default(mockP6Tasks), numTasks)
  //     .map((task) => {
  //       if (days > 0) {
  //         task.START_DATE = startDate
  //           .clone()
  //           .add(Math.floor(Math.random() * 12) + 1, "hours")
  //           .format("YYYY/MM/DD kk:mm:ss");
  //         task.END_DATE = startDate
  //           .clone()
  //           .add(Math.floor(Math.random() * days) + 1, "days")
  //           .format("YYYY/MM/DD kk:mm:ss");
  //       } else {
  //         task.START_DATE = startDate
  //           .clone()
  //           .add(Math.floor(Math.random() * 12) + 1, "hours")
  //           .format("YYYY/MM/DD kk:mm:ss");
  //         task.END_DATE = startDate
  //           .clone()
  //           .add(Math.floor(Math.random() * 12) + 10, "hours")
  //           .format("YYYY/MM/DD kk:mm:ss");
  //       }
  //       return task;
  //     });
  return Promise.resolve({ VALUE: tasks });
};
