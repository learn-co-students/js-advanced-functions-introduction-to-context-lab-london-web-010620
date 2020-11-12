const createEmployeeRecord = array => {
  const newRecord = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return newRecord;
};

const createEmployeeRecords = array => {
  let employeeRecords = [];
  array.forEach(element => employeeRecords.push(createEmployeeRecord(element)));
  return employeeRecords;
};

const createTimeInEvent = (employee, dateTime) => {
  let dateTimeSplit = dateTime.split(" ");
  let date = dateTimeSplit[0];
  let time = parseInt(dateTimeSplit[1]);
  employee.timeInEvents.push({ type: "TimeIn", hour: time, date: date });
  return employee;
};

const createTimeOutEvent = (employee, dateTime) => {
  let dateTimeSplit = dateTime.split(" ");
  let date = dateTimeSplit[0];
  let time = parseInt(dateTimeSplit[1]);
  employee.timeOutEvents.push({ type: "TimeOut", hour: time, date: date });
  return employee;
};

const hoursWorkedOnDate = (employee, date) => {
  let timeIn = employee.timeInEvents.find(event => event.date == date);
  let timeOut = employee.timeOutEvents.find(event => event.date == date);

  let hoursWorked = (timeOut.hour - timeIn.hour) / 100;
  return hoursWorked;
};

const wagesEarnedOnDate = (employee, date) => {
  const hours = hoursWorkedOnDate(employee, date);
  let wages = hours * employee.payPerHour;
  return wages;
};

const allWagesFor = employee => {
  return employee.timeOutEvents.reduce((total, current) => {
    return total + wagesEarnedOnDate(employee, current.date);
  }, 0);
};

const calculatePayroll = empRecords => {
  return empRecords.reduce((total, current) => {
    return total + allWagesFor(current);
  }, 0);
};

const findEmployeeByFirstName = (records, firstName) => {
  return records.find(element => element.firstName == firstName);
};
