// Your code here
const createEmployeeRecord = (record) => {
	return {
		firstName: record[0],
		familyName: record[1],
		title: record[2],
		payPerHour: record[3],
		timeInEvents: [],
		timeOutEvents: []
	};
};

const createEmployeeRecords = (data) => {
	return data.map(createEmployeeRecord);
};
const createTimeInEvent = (record, date) => {
	let timeInEvent = {
		type: 'TimeIn',
		hour: parseInt(date.split(' ')[1]),
		date: date.split(' ')[0]
	};
	record.timeInEvents.push(timeInEvent);
	return record;
};
const createTimeOutEvent = (record, date) => {
	let timeOutEvent = {
		type: 'TimeOut',
		hour: parseInt(date.split(' ')[1]),
		date: date.split(' ')[0]
	};
	record.timeOutEvents.push(timeOutEvent);
	return record;
};
const hoursWorkedOnDate = (record, date) => {
	const timeIn = record.timeInEvents.find((event) => event.date === date);
	const timeOut = record.timeOutEvents.find((event) => event.date === date);
	const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
	return hoursWorked;
};
const wagesEarnedOnDate = (record, date) => {
	let hoursWorked = hoursWorkedOnDate(record, date);
	let pay = hoursWorked * record.payPerHour;
	return pay;
};
const allWagesFor = (record) => {
	const datesWorked = record.timeInEvents.map((event) => event.date);
	const wagesOnDatesWorked = datesWorked.map((date) => wagesEarnedOnDate(record, date));
	const totalWages = wagesOnDatesWorked.reduce((total, earning) => total + earning, 0);
	return totalWages;
};
const findEmployeeByFirstName = (srcArray, firstName) => {
	return srcArray.find((record) => record.firstName === firstName);
};
const calculatePayroll = (employeeRecords) => {
	const totalPay = employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
	return totalPay;
};
