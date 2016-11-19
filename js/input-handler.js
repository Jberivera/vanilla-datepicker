const TAB = 9;

export default function inputHandler (e) {
  const datepickerShown = document.querySelector('.datepicker--show');

  if (datepickerShown) {
    datepickerShown.classList.remove('datepicker--show');
  } else {
    document.addEventListener('click', blurHandler);
    document.addEventListener('keyup', tabHandler);
  }
  setTimeout(() => {
    e.target.parentNode.classList.add('datepicker--show');
  }, 0);
}

function blurHandler (e) {
  if (!/date__|datepicker__/.test(e.target.className)) {
    const datepickerShown = document.querySelector('.datepicker--show');
    datepickerShown && datepickerShown.classList.remove('datepicker--show');
    document.removeEventListener('click', blurHandler);
    document.removeEventListener('keyup', tabHandler);
  }
}

function tabHandler (e) {
  if (e.keyCode === TAB && !/date__|datepicker__/.test(e.target.className)) {
    const datepickerShown = document.querySelector('.datepicker--show');
    datepickerShown && datepickerShown.classList.remove('datepicker--show');
    document.removeEventListener('click', blurHandler);
    document.removeEventListener('keyup', tabHandler);
  }
}
