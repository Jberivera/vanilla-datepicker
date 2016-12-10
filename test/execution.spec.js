import expect from 'expect';
import datepicker from '../datepicker';

describe('executes without error', function () {
  it('receives no arguments', function () {
    try {
      datepicker();
    } catch (e) {
      throw 'Not working properly';
    }
  });

  it('receives callback function', function () {
    try {
      datepicker(function () {});
    } catch (e) {
      throw 'Not working properly';
    }
  });

  it('receives config object', function () {
    try {
      datepicker({});
    } catch (e) {
      throw 'Not working properly';
    }
  });
});
