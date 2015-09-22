# ampersand-date-view2    ![Build Status](https://api.travis-ci.org/thisjustin/ampersand-date-view.svg?branch=master)

An extension of
 [ampersand-date-view](https://github.com/mikehedman/ampersand-date-view) and
 [ampersand-input-view](https://github.com/AmpersandJS/ampersand-input-view) to create a three part date control.

This control renders month as an input. I
f you want month as a select menu see the original [ampersand-date-view](https://github.com/mikehedman/ampersand-date-view). 

## install
```
npm install ampersand-date-view2
```

## example

```javascript
var FormView = require('ampersand-form-view');
var DateView = require('ampersand-date-view2');

module.exports = FormView.extend({
    fields: function () {
        return [
            new DateView({
              label: 'Birth date',
              value: this.model.birthDate || '',
              name: 'birthDate',
              yearMax: 2000
            }),
            ...
        ];
    }
});

```

#### opts

- yearMin   (defaults to 1900)
- yearMax   (defaults to 2100)

And all the standard options from ampersand-input-view

## changelog
0.0.7 - removing hardcoded limitation on year
0.0.8 - Changes provided by @xicombd from @sinfo: added yearMin, yearMax constraints, demo, and lint cleanup 
0.0.9 - (forked from ampersand-date-view) changed month field from select to input

## credits

Thanks to the Ampersand group & Mike Hedman!

## license

MIT

