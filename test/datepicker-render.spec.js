import expect from 'expect';
import datepicker from '../datepicker';
import { createDomElement, appendArray } from '../js/dom-utils';

const TEST_DATE = new Date('01/01/2016');
let $datepicker;

describe('renders datepicker', function () {
  before(function () {
    const markup = createDomElement(
      'div',
      { class: 'datepicker' },
      [ createDomElement('input', { type: 'text', class: 'datepicker__input' }) ]
    );
    document.body.appendChild(markup);
    datepicker({ date: TEST_DATE });
  });

  it('creates datepicker markup', function () {
    $datepicker = document.querySelector('.datepicker .date');

    expect($datepicker).toExist();
  });

  it('sets header month and year properly on creation', function () {
    const headerMonth = $datepicker.querySelector('.date__header-month');
    const headerYear = $datepicker.querySelector('.date__header-year');

    expect(headerMonth.value).toBe('0');
    expect(headerYear.value).toBe('2016');
  });

  it('sets days of month properly on creation', function () {
    const days = $datepicker.querySelectorAll('.date__day');
    const cols = $datepicker.querySelectorAll('.date__day-container .date--col');

    expect(days.length).toBe(31);
    expect(cols[5].textContent).toBe('1');
  });
});
