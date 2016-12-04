export function inputHandler (e) {
  const datepickerShown = document.querySelector('.datepicker--show');

  if (datepickerShown) {
    datepickerShown.classList.remove('datepicker--show');
  } else {
    document.addEventListener('click', blurHandler);
  }
  setTimeout(() => {
    e.target.parentNode.classList.add('datepicker--show');
  }, 0);
}

export function blurHandler (e) {
  if (!/date__|datepicker__/.test(e.target.className)) {
    const datepickerShown = document.querySelector('.datepicker--show');
    datepickerShown && datepickerShown.classList.remove('datepicker--show');
    document.removeEventListener('click', blurHandler);
  }
}
