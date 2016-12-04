import './scss/datepicker.scss';
import { isLeapYear, getMonthString, getNumberOfDays, getFirstDayOfWeek } from './js/date-utils';
import { createDomElement, appendArray } from './js/dom-utils';
import { inputHandler } from './js/input-behavior-handlers';

function setInputValue (date) {
  var array = /(?:\w{4})-(?:\w{2})-(?:\w{2})/.exec(date.toISOString())[0].split('-');
  return `${array[1]}/${array[2]}/${array[0]}`;
}

function renderDatePicker (datePicker, date, callback) {
  const year = date.getFullYear(),
    month = date.getMonth(),
    day = date.getDate() - 1,
    monthString = getMonthString(date),
    monthDays = getNumberOfDays(year, month),
    firstDayOfWeek= getFirstDayOfWeek(year, month),
    dateInput = datePicker.querySelector('.datepicker__input');
  let wrapper,
    container,
    header,
    daysNames,
    ul,
    self;

  dateInput.value = setInputValue(date);
  wrapper = createDomElement('div', { class: 'date', style: 'display: none' });
  container = createDomElement('div', { class: 'date__container' });
  header = createDomElement(
    'div',
    { class: 'date__header' },
    [
      createDomElement('div', { class: 'date__arrow date__left-arrow' }),
      createDomElement('span', { class: 'date__header-title' }, `${monthString} ${year}`),
      createDomElement('div', { class: 'date__arrow date__right-arrow' })
    ]
  );
  daysNames = createDomElement('div', { class: 'date__days-names' }, [
    createDomElement('div', { class: 'date__day-name date--col' }, 'Mo'),
    createDomElement('div', { class: 'date__day-name date--col' }, 'Tu'),
    createDomElement('div', { class: 'date__day-name date--col' }, 'We'),
    createDomElement('div', { class: 'date__day-name date--col' }, 'Th'),
    createDomElement('div', { class: 'date__day-name date--col' }, 'Fr'),
    createDomElement('div', { class: 'date__day-name date--col' }, 'Sa'),
    createDomElement('div', { class: 'date__day-name date--col' }, 'Su'),
  ]);
  ul = createDomElement(
    'ul',
    { class: 'date__day-container' },
    renderLiElementsIntoArray(firstDayOfWeek, monthDays, day)
  );

  appendArray(container, [
    header,
    daysNames,
    ul
  ]);
  wrapper.appendChild(container);

  self = { year, month, header, ul, dateInput, callback };

  header.addEventListener('click', headerHandler.bind(self));
  ul.addEventListener('click', dateDayHandler.bind(self));
  dateInput.addEventListener('click', inputHandler);

  return wrapper;
}

function renderLiElementsIntoArray (firstDayOfWeek, monthDays, day) {
  let emptyDays,
    daysOfMonth;

  emptyDays = Array.apply(null, { length: firstDayOfWeek - 1 }).map(function (_, i) {
    return '<li class="date--col"></li>';
  });

  daysOfMonth = Array.apply(null, { length: monthDays }).map(function (_, i) {
    return `<li class="date__day date--col${((i === day && ' date--active"') || '"')}>${Number(i + 1)}</li>`;
  });

  return [...emptyDays, ...daysOfMonth];
}

function changeDate (dateStr) {
  const date = new Date(dateStr),
    { header, ul, dateInput, callback } = this,
    year = date.getFullYear(),
    month = date.getMonth(),
    day = date.getDate() - 1,
    monthString = getMonthString(date),
    firstDayOfWeek= getFirstDayOfWeek(year, month),
    monthDays = getNumberOfDays(year, month);

  this.year = year;
  this.month = month;

  header.querySelector('.date__header-title').innerHTML = `${monthString} ${year}`;
  dateInput.value = setInputValue(date);
  appendArray(ul, renderLiElementsIntoArray(firstDayOfWeek, monthDays, day));
  typeof callback === 'function' && callback(date, dateInput);
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
    }
    else {
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

  datePickers = Array.prototype.slice.call(datePickers);

  datePickers.forEach(function (datePicker) {
    wrapper = renderDatePicker(datePicker, new Date(), callback);

    datePicker.appendChild(wrapper);
    resetStyleTimeout(wrapper);
  });
}
