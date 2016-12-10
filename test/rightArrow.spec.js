import expect from 'expect';

let datepicker, rightArrow, headerMonth, headerYear, days, cols;

describe('changes the months forwards by clicking the right arrow button', function () {
  before(function () {
    datepicker = document.querySelector('.datepicker .date');
    rightArrow = datepicker.querySelector('.date__right-arrow');
    headerMonth = datepicker.querySelector('.date__header-month');
    headerYear = datepicker.querySelector('.date__header-year');
  });

  beforeEach(function () {
    fireClick(rightArrow);
    days = datepicker.querySelectorAll('.date__day');
    cols = datepicker.querySelectorAll('.date__day-container .date--col');
  });

  it('February', function () {
    expect(headerMonth.value).toBe('1');
    expect(headerYear.value).toBe('2016');

    expect(days.length).toBe(29);
    expect(cols[1].textContent).toBe('1');
  });

  it('March', function () {
    expect(headerMonth.value).toBe('2');
    expect(headerYear.value).toBe('2016');

    expect(days.length).toBe(31);
    expect(cols[2].textContent).toBe('1');
  });

  it('April', function () {
    expect(headerMonth.value).toBe('3');
    expect(headerYear.value).toBe('2016');

    expect(days.length).toBe(30);
    expect(cols[5].textContent).toBe('1');
  });

  it('May', function () {
    expect(headerMonth.value).toBe('4');
    expect(headerYear.value).toBe('2016');

    expect(days.length).toBe(31);
    expect(cols[0].textContent).toBe('1');
  });

  it('June', function () {
    expect(headerMonth.value).toBe('5');
    expect(headerYear.value).toBe('2016');

    expect(days.length).toBe(30);
    expect(cols[3].textContent).toBe('1');
  });

  it('July', function () {
    expect(headerMonth.value).toBe('6');
    expect(headerYear.value).toBe('2016');

    expect(days.length).toBe(31);
    expect(cols[5].textContent).toBe('1');
  });

  it('August', function () {
    expect(headerMonth.value).toBe('7');
    expect(headerYear.value).toBe('2016');

    expect(days.length).toBe(31);
    expect(cols[1].textContent).toBe('1');
  });

  it('September', function () {
    expect(headerMonth.value).toBe('8');
    expect(headerYear.value).toBe('2016');

    expect(days.length).toBe(30);
    expect(cols[4].textContent).toBe('1');
  });

  it('October', function () {
    expect(headerMonth.value).toBe('9');
    expect(headerYear.value).toBe('2016');

    expect(days.length).toBe(31);
    expect(cols[6].textContent).toBe('1');
  });

  it('November', function () {
    expect(headerMonth.value).toBe('10');
    expect(headerYear.value).toBe('2016');

    expect(days.length).toBe(30);
    expect(cols[2].textContent).toBe('1');
  });

  it('December', function () {
    expect(headerMonth.value).toBe('11');
    expect(headerYear.value).toBe('2016');

    expect(days.length).toBe(31);
    expect(cols[4].textContent).toBe('1');
  });

  it('January next year', function () {
    expect(headerMonth.value).toBe('0');
    expect(headerYear.value).toBe('2017');

    expect(days.length).toBe(31);
    expect(cols[0].textContent).toBe('1');
  });
});

function fireClick(element) {
  const event = document.createEvent('MouseEvents');
  event.initEvent('click', true, true);
  element.dispatchEvent(event);
};
