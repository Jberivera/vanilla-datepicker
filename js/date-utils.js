export const isLeapYear = (function () {
  var leapYear = {};

  return function (year) {
    return typeof leapYear[year] === 'boolean' ? leapYear[year] : leapYear[year] = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0, leapYear[year];
  };
}());

export function getNumberOfDays (year, month) {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

export function getFirstDayOfWeek (year, month) {
  return (new Date(`${year}/${month + 1}/01`)).getDay();
}
