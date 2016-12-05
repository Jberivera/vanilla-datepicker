import './scss/datepicker.scss';
import { isLeapYear, getMonthString, getNumberOfDays, getFirstDayOfWeek } from './js/date-utils';
import { createDomElement, appendArray } from './js/dom-utils';
import inputHandler from './js/input-handler';

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
      createDomElement('span', { class: 'date__header-title' }, [
        createDomElement('span', { class: 'date__header-month'}, monthString),
        createDomElement('span', { class: 'date__header-year'}, year)
      ]),
      createDomElement('div', { class: 'date__arrow date__right-arrow' })
    ]
  );
  daysNames = createDomElement('div', { class: 'date__days-names' }, [
    '<div class="date__day-name date--col">Su</div>',
    '<div class="date__day-name date--col">Mo</div>',
    '<div class="date__day-name date--col">Tu</div>',
    '<div class="date__day-name date--col">We</div>',
    '<div class="date__day-name date--col">Th</div>',
    '<div class="date__day-name date--col">Fr</div>',
    '<div class="date__day-name date--col">Sa</div>'
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
  dateInput.addEventListener('focus', inputHandler);

  return wrapper;
}

function renderLiElementsIntoArray (firstDayOfWeek, monthDays, day) {
  let emptyDays,
    daysOfMonth;

  emptyDays = Array(firstDayOfWeek + 1).join('<li class="date--col"></li>');

  daysOfMonth = Array.apply(null, { length: monthDays }).map(function (_, i) {
    return `<li class="date__day date--col${((i === day && ' date--active"') || '"')}>${Number(i + 1)}</li>`;
  });

  return [emptyDays, ...daysOfMonth];
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

  if (this.year !== year) {
    this.year = year;
    header.querySelector('.date__header-year').innerHTML = year;
  }

  if (this.month !== month) {
    this.month = month;
    header.querySelector('.date__header-month').innerHTML = monthString;
  }

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

  datePickers = Array.prototype.slice.call(datePickers);

  datePickers.forEach(function (datePicker) {
    wrapper = renderDatePicker(datePicker, new Date(), callback);

    datePicker.appendChild(wrapper);
    resetStyleTimeout(wrapper);
  });
}
