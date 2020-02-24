// Your code here
const createEmployeeRecord = array => {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
};

const createEmployeeRecords = array => {
  return array.map(item => createEmployeeRecord(item));
};

const createTimeInEvent = (obj, time) => {
  obj.timeInEvents.push({
    type: "TimeIn",
    date: time.split(" ")[0],
    hour: parseInt(time.split(" ")[1])
  });
  return obj;
};

const createTimeOutEvent = (obj, time) => {
  obj.timeOutEvents.push({
    type: "TimeOut",
    date: time.split(" ")[0],
    hour: parseInt(time.split(" ")[1])
  });
  return obj;
};

const hoursWorkedOnDate = (record, date) => {
  return (
    (record.timeOutEvents.find(item => item.date == date).hour -
      record.timeInEvents.find(item => item.date == date).hour) /
    100
  );
};

const wagesEarnedOnDate = (record, date) => {
  return hoursWorkedOnDate(record, date) * record.payPerHour;
};

const allWagesFor = record => {
  return record.timeOutEvents.reduce((total, current) => {
    return total + wagesEarnedOnDate(record, current.date);
  }, 0);
};

const calculatePayroll = records => {
  return records.reduce((total, record) => {
    return total + allWagesFor(record);
  }, 0);
};

const findEmployeeByFirstName = (array, name) => {
  return array.find(record => record.firstName === name);
};
