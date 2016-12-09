import expect from 'expect';
import datepicker from '../datepicker';
import { createDomElement, appendArray } from '../js/dom-utils';

const TEST_DATE = new Date('01/01/2016');

describe('datepicker', function () {
  before(function () {
    const markup = createDomElement(
      'div',
      { class: 'datepicker' },
      [ createDomElement('input', { type: 'text', class: 'datepicker__input' }) ]
    );
    document.body.appendChild(markup);
    datepicker({ date: TEST_DATE });
  });

  after(function () {
    document.querySelector('.datepicker').remove();
  });

  it('creates datepicker markup', function () {
    const datepicker = document.querySelector('.datepicker .date');

    expect(datepicker).toExist();
  });

  it('sets header month and year properly on creation', function () {
    const datepicker = document.querySelector('.datepicker .date');
    const headerMonth = datepicker.querySelector('.date__header-month');
    const headerYear = datepicker.querySelector('.date__header-year');

    expect(headerMonth.value).toBe('0');
    expect(headerYear.value).toBe('2016');
  });

  it('sets days of month properly on creation', function () {
    const datepicker = document.querySelector('.datepicker .date');
    const days = datepicker.querySelectorAll('.date__day');
    const cols = datepicker.querySelectorAll('.date__day-container .date--col');

    expect(days.length).toBe(31);
    expect(cols[5].textContent).toBe('1');
  });

  it('changes the next month on rightArrow click', function () {
    const datepicker = document.querySelector('.datepicker .date');
    const rightArrow = datepicker.querySelector('.date__right-arrow');
    const headerMonth = datepicker.querySelector('.date__header-month');
    const headerYear = datepicker.querySelector('.date__header-year');

    fireClick(rightArrow);

    const days = datepicker.querySelectorAll('.date__day');
    const cols = datepicker.querySelectorAll('.date__day-container .date--col');

    expect(headerMonth.value).toBe('1');
    expect(headerYear.value).toBe('2016');

    expect(days.length).toBe(29);
    expect(cols[1].textContent).toBe('1');
  });
});

function fireClick(element) {
  const event = document.createEvent('MouseEvents');
  event.initEvent('click', true, true);
  element.dispatchEvent(event);
};
