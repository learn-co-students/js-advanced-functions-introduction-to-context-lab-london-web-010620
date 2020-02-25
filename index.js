// Your code here

const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

const createEmployeeRecords = (array) => {
    return array.map(row => createEmployeeRecord(row));
};

const createTimeInEvent = (employee, time) => {
    employee.timeInEvents.push({
        type: 'TimeIn',
        date: time.split(" ")[0],
        hour: parseInt(time.split(" ")[1])
    });
    return employee;
};

const createTimeOutEvent = (employee, time) => {
    employee.timeOutEvents.push({
        type: 'TimeOut',
        date: time.split(" ")[0],
        hour: parseInt(time.split(" ")[1])
    });
    return employee;
};

const hoursWorkedOnDate = (employee, date) => {
    return ( employee.timeOutEvents.find(event => event.date == date).hour - 
    employee.timeInEvents.find(event => event.date == date).hour ) / 100
};

const wagesEarnedOnDate = (employee, date) => {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
};

const allWagesFor = (employee) => {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const wagesOnDatesWorked = datesWorked.map(date => wagesEarnedOnDate(employee, date));
    const totalWages = wagesOnDatesWorked.reduce((total, earning) => total + earning);
    return totalWages;
}; 

const calculatePayroll = records => {
    return records.reduce((total, record) => {
      return total + allWagesFor(record);
    }, 0);
  };

const findEmployeeByFirstName = (array, name) => {
    return array.find(record => record.firstName === name);
  };

