# Vanilla Datepicker

It is a javascript library without dependencies to provide a consistent datepicker experience through different browsers.

[Try it out, demo!](https://jberivera.github.io/vanilla-datepicker/)

[![npm version](https://img.shields.io/npm/v/vanilla-datepicker.svg?style=flat-square)](https://www.npmjs.com/package/vanilla-datepicker)
[![npm downloads](https://img.shields.io/npm/dm/vanilla-datepicker.svg?style=flat-square)](https://www.npmjs.com/package/vanilla-datepicker)

## Getting Started

This module is exported by webpack as a UMD bundle library.

`output.libraryTarget: "umd"`

### Install

```bash
$ npm install vanilla-datepicker --save
```

### Javascript

```js
const datepicker = require('vanilla-datepicker');

datepicker();
```

### Markup

It renders the datepicker through each group of following markup

```html
<div class="datepicker">
  <input type="text" class="datepicker__input" />
</div>
```

![datepicker](https://i.imgur.com/UgCmG5O.jpg)

### Callback

Provide a callback to get an update (date) from each field and its reference

```js
const datepicker = require('vanilla-datepicker');

datepicker(function (date, input) {
  // Default format MM / DD / YYYY
  input.value = 'A different date format: ' + date.getDate();
});
```

### Color change

Use one level of specificity to modify colors

```css
.app .date__header {
  background: darkcyan;
}

.app .date--active {
  background: darkcyan;
}
```

![datepicker](https://i.imgur.com/D6RieHO.jpg)

## Config Object

Not required. But useful if you want to change the language of months or if you require a different range of selection for year in the calendar header.

```js
var config = {
  yearConfig: {
    start: 2000, // Default 1900
    end: 2018    // Default 2100
  },
  // Specify a different monthString value. Default: English
  monthString: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic'
  ]
};

datepicker(config, function (date, input) {
  // Default format MM / DD / YYYY
  input.value = 'A different date format: ' + date.getDate();
});
```

## Project Dev Tools

- [Webpack](https://webpack.github.io/)
- [Babel](https://babeljs.io/)
- [Sass](http://sass-lang.com/)

## Project Scripts

- `npm start`
- `npm run build`
