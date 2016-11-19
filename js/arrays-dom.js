export const DAYS_NAMES = [
  '<div class="date__day-name date--col">Su</div>',
  '<div class="date__day-name date--col">Mo</div>',
  '<div class="date__day-name date--col">Tu</div>',
  '<div class="date__day-name date--col">We</div>',
  '<div class="date__day-name date--col">Th</div>',
  '<div class="date__day-name date--col">Fr</div>',
  '<div class="date__day-name date--col">Sa</div>'
];

export const MONTH_STRING_EN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export function renderMonthOptions (monthString) {
  return monthString.map(function (month, i) {
    return `<option value="${i}">${month}</option>`;
  });
}

export function renderYearOptions ({start, end}) {
  return Array.apply(null, { length: end - start + 1 }).map(function (_, i) {
    const year = i * 1 + start;
    return `<option value="${year}">${year}</option>`;
  });
}
