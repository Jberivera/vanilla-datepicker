import './scss/datepicker.scss';
import { isLeapYear, getNumberOfDays, getFirstDayOfWeek } from './js/date-utils';
import { createDomElement, appendArray } from './js/dom-utils';
import inputHandler from './js/input-handler';
import { DAYS_NAMES, MONTH_OPTIONS } from './js/arrays-dom';

const toArray = Function.prototype.call.bind(Array.prototype.slice);
const YEAR_CONFIG = {
  start: 1900,
  end: 2100
};

function setInputValue (date) {
  var array = /(?:\w{4})-(?:\w{2})-(?:\w{2})/.exec(date.toISOString())[0].split('-');
  return `${array[1]}/${array[2]}/${array[0]}`;
}

function renderDatePicker (datePicker, date, callback) {
  let year = date.getFullYear(),
    month = date.getMonth(),
    day = date.getDate(),
    monthDays = getNumberOfDays(year, month),
    firstDayOfWeek= getFirstDayOfWeek(year, month),
    dateInput = datePicker.querySelector('.datepicker__input'),
    wrapper,
    container,
    header,
    monthPicker,
    yearPicker,
    daysNames,
    ul,
    self;

  dateInput.value = setInputValue(date);
  wrapper = createDomElement('div', { class: 'date', style: 'display: none' });
  container = createDomElement('div', { class: 'date__container' });
  monthPicker = createDomElement('select', { class: 'date__header-month', tabindex: '-1' }, MONTH_OPTIONS);
  yearPicker = createDomElement('select', { class: 'date__header-year', tabindex: '-1' }, renderYearOptions(YEAR_CONFIG));
  header = createDomElement(
    'div',
    { class: 'date__header' },
    [
      createDomElement('div', { class: 'date__arrow date__left-arrow' }),
      createDomElement('span', { class: 'date__header-title' }, [
        monthPicker,
        yearPicker
      ]),
      createDomElement('div', { class: 'date__arrow date__right-arrow' })
    ]
  );
  daysNames = createDomElement('div', { class: 'date__days-names' }, DAYS_NAMES);
  ul = createDomElement(
    'ul',
    { class: 'date__day-container' },
    renderLiElementsIntoArray(firstDayOfWeek, monthDays, day)
  );

  monthPicker.selectedIndex = month;
  yearPicker.selectedIndex = year - YEAR_CONFIG.start;

  appendArray(container, [
    header,
    daysNames,
    ul
  ]);
  wrapper.appendChild(container);

  self = { year, month, day, header, ul, dateInput, callback };

  header.addEventListener('click', headerHandler.bind(self));
  ul.addEventListener('click', dateDayHandler.bind(self));
  dateInput.addEventListener('focus', inputHandler);
  monthPicker.addEventListener('change', selectionChange.bind(self));
  yearPicker.addEventListener('change', selectionChange.bind(self));

  return wrapper;
}

function renderLiElementsIntoArray (firstDayOfWeek, monthDays, day) {
  let emptyDays,
    daysOfMonth;
  day -= 1;

  emptyDays = Array(firstDayOfWeek + 1).join('<li class="date--col"></li>');

  daysOfMonth = Array.apply(null, { length: monthDays }).map(function (_, i) {
    return `<li class="date__day date--col${i === day ? ' date--active"' : '"'}>${Number(i + 1)}</li>`;
  });

  return [emptyDays, ...daysOfMonth];
}

function renderYearOptions ({start, end}) {
  return Array.apply(null, { length: end - start + 1 }).map(function (_, i) {
    const year = i * 1 + start;
    return `<option value="${year}">${year}</option>`;
  });
}

function changeDate (dateStr) {
  const date = new Date(dateStr),
    { header, ul, dateInput, callback } = this,
    year = date.getFullYear(),
    month = date.getMonth(),
    day = date.getDate(),
    firstDayOfWeek= getFirstDayOfWeek(year, month),
    monthDays = getNumberOfDays(year, month);

  this.day = day;

  if (this.year !== year) {
    this.year = year;
    header.querySelector('.date__header-year').selectedIndex = year - YEAR_CONFIG.start;
  }

  if (this.month !== month) {
    this.month = month;
    header.querySelector('.date__header-month').selectedIndex = month;
  }

  dateInput.value = setInputValue(date);
  appendArray(ul, renderLiElementsIntoArray(firstDayOfWeek, monthDays, day));
  typeof callback === 'function' && callback(date, dateInput);
}

function selectionChange (e) {
  let { value } = e.target,
    { year, month, day } = this,
    monthDays,
    date;

  if (value < YEAR_CONFIG.start) {
    monthDays = getNumberOfDays(year, value);
    date = `${year}/${Number(value) + 1}/${day > monthDays ? monthDays : day}`;
  } else {
    monthDays = getNumberOfDays(value, month);
    date = `${value}/${Number(month) + 1}/${day > monthDays ? monthDays : day}`;
  }

  changeDate.call(this, date);
}

function headerHandler (e) {
  let { target } = e,
    { year, month } = this,
    right,
    date;

  if (target.classList.contains('date__arrow')) {
    right = target.classList.contains('date__right-arrow');

    if (right) {
      month = month < 11 ? month + 2 : (year += 1, 1);
    } else {
      month = month > 0 ? month : (year -= 1, 12);
    }
    date = `${year}/${month}/${right ? 1 : getNumberOfDays(year, month - 1) }`;

    changeDate.call(this, date);
  }
}

function dateDayHandler (e) {
  let { target } = e,
    { year, month } = this,
    dateDay,
    date;

  if (target.classList.contains('date__day')) {
    dateDay = Number(target.textContent);
    date = `${year}/${month + 1}/${dateDay}`

    changeDate.call(this, date);
  }
}

function resetStyleTimeout (element) {
  setTimeout(() => element.removeAttribute('style'), 0);
}

export default function datePickerInit (callback) {
  let datePickers = document.querySelectorAll('.datepicker'),
    wrapper;

  datePickers = toArray(datePickers);

  datePickers.forEach(function (datePicker) {
    wrapper = renderDatePicker(datePicker, new Date(), callback);

    datePicker.appendChild(wrapper);
    resetStyleTimeout(wrapper);
  });
}
