var dateUtils = require('./js/date-utils'),
  domUtils = require('./js/dom-utils'),
  isLeapYear = dateUtils.isLeapYear,
  getNumberOfDays = dateUtils.getNumberOfDays,
  getFirstDayOfWeek = dateUtils.getFirstDayOfWeek,
  getMonthString = dateUtils.getMonthString,
  createDomElement = domUtils.createDomElement,
  appendArray = domUtils.appendArray;

function setInputValue (date) {
  var array = /(?:\w{4})-(?:\w{2})-(?:\w{2})/.exec(date.toISOString())[0].split('-');
  return array[1] + '/' + array[2] + '/' + array[0];
}

function renderDatePicker (datePicker, date) {
  var year = date.getFullYear(),
    month = date.getMonth(),
    day = date.getDate() - 1,
    monthString = getMonthString(date),
    monthDays = getNumberOfDays(year, month),
    firstDayOfWeek= getFirstDayOfWeek(year, month),
    dateInput = datePicker.querySelector('.datepicker__input'),
    wrapper,
    container,
    header,
    ul,
    self;

  dateInput.value = setInputValue(date);
  wrapper = createDomElement('div', { class: 'date' });
  container = createDomElement('div', { class: 'date__container' });
  header = createDomElement(
    'div',
    { class: 'date__header' },
    [
      createDomElement('div', { class: 'date__arrow date__left-arrow' }),
      createDomElement('span', { class: 'date__header-title' }, monthString + ' ' + year),
      createDomElement('div', { class: 'date__arrow date__right-arrow' })
    ]
  );
  ul = createDomElement(
    'ul',
    { class: 'date__day-container' },
    renderLiElementsIntoArray(firstDayOfWeek, monthDays, day)
  );

  appendArray(container, [header, ul]);
  wrapper.appendChild(container);

  self = { year: year, month: month, header: header, ul: ul, dateInput: dateInput };

  header.addEventListener('click', headerHandler.bind(self));
  ul.addEventListener('click', dateDayHandler.bind(self));
  wrapper.addEventListener('click', function (e) {
    dateInput.focus();
  });

  return wrapper;
}

function renderLiElementsIntoArray (firstDayOfWeek, monthDays, day) {
  var dayHeader,
    emptyDays,
    daysOfMonth;

  dayHeader = [
    '<li class="date__day-name date--col">Mo</li>',
    '<li class="date__day-name date--col">Tu</li>',
    '<li class="date__day-name date--col">We</li>',
    '<li class="date__day-name date--col">Th</li>',
    '<li class="date__day-name date--col">Fr</li>',
    '<li class="date__day-name date--col">Sa</li>',
    '<li class="date__day-name date--col">Su</li>'
  ];

  emptyDays = Array.apply(null, { length: firstDayOfWeek - 1 }).map(function (_, i) {
    return '<li class="date--col"></li>';
  });

  daysOfMonth = Array.apply(null, { length: monthDays }).map(function (_, i) {
    return '<li class="date__day date--col' + ((i === day && ' date--active"') || '"') + '>' + Number(i + 1) + '</li>';
  });

  return dayHeader.concat(emptyDays, daysOfMonth);
}

function changeDate (str, header, ul) {
  var date = new Date(str),
    header = this.header,
    ul = this.ul,
    dateInput = this.dateInput,
    year = date.getFullYear(),
    month = date.getMonth(),
    day = date.getDate() - 1,
    monthString = getMonthString(date),
    firstDayOfWeek= getFirstDayOfWeek(year, month),
    monthDays = getNumberOfDays(year, month);

  this.year = year;
  this.month = month;

  header.querySelector('.date__header-title').innerHTML = monthString + ' ' + year;
  dateInput.value = setInputValue(date);
  appendArray(ul, renderLiElementsIntoArray(firstDayOfWeek, monthDays, day));
}

function headerHandler (e) {
  var target = e.target,
    year = this.year,
    month = this.month,
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
    date = year + '/' + month + '/' + (right ? 1 : getNumberOfDays(year, month - 1));

    changeDate.call(this, date);
  }
}

function dateDayHandler (e) {
  var target = e.target,
    year = this.year,
    month = this.month,
    dateDay,
    date;

  if (target.classList.contains('date__day')) {
    dateDay = Number(target.textContent);
    date = year + '/' + (month + 1) + '/' + dateDay;

    changeDate.call(this, date);
  }
}

function datePickerInit () {
  var datePickers = document.querySelectorAll('.datepicker'),
    date;

  datePickers = Array.prototype.slice.call(datePickers);

  datePickers.forEach(function (datePicker) {
    date = new Date();
    datePicker.appendChild(renderDatePicker(datePicker, date));
  });
}
datePickerInit();
