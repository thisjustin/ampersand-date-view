var test = require('tape');
var DateView = require('../ampersand-date-view');
if (!Function.prototype.bind) Function.prototype.bind = require('function-bind');

function isHidden(el) {
    return el.style.display === 'none';
}

test('basic initialization', function (t) {
    var control = new DateView({ name: 'title' });
    control.render();
    t.equal(control.el.tagName, 'DIV');
    t.equal(control.el.querySelectorAll('input').length, 4);
    t.equal(control.el.querySelector('input[type=hidden]').getAttribute('name'), 'title');
    t.end();
});

test('initialize with value', function (t) {
    var control = new DateView({
        name: 'title',
        value: new Date('2000-10-12T08:00:00.000Z')
    });

    control.render();

    t.equal(control.el.querySelector('[data-hook=month] input').value, '10');
    t.equal(control.el.querySelector('[data-hook=day] input').value, '12');
    t.equal(control.el.querySelector('[data-hook=year] input').value, '2000');
    t.end();
});

test('initialize with invalid value', function (t) {
    var control = new DateView({
        name: 'title',
        value: new Date('hello')
    });

    control.render();

    t.equal(control.el.querySelector('[data-hook=month] input').value, '');
    t.equal(control.el.querySelector('[data-hook=day] input').value, '');
    t.equal(control.el.querySelector('[data-hook=year] input').value, '');
    t.end();
});

test('value change', function (t) {
    var original = new Date('2000-10-12T08:00:00.000Z');
    var control = new DateView({
        name: 'title',
        value: original
    });

    control.render();

    control.el.querySelector('[data-hook=day] input').value = 15;
    //force a recalculation
    control.handleInputChanged();

    t.equal(control.value.getDate(), 15);
    t.end();
});

test('invalid year value change', function (t) {
    var original = new Date('2000-10-12T08:00:00.000Z');
    var control = new DateView({
        name: 'title',
        value: original,
        yearMax: 2000
    });

    control.render();

    var errorMessage = control.el.querySelector('[data-hook=message-container]');
    t.ok(isHidden(errorMessage), 'error should be hidden to start');
    control.yearView.setValue('2014', false);
    control.handleInputChanged();
    control.beforeSubmit();
    t.equal(control.value.getFullYear(), 2014);
    t.ok(!isHidden(errorMessage), 'error should be visible now');
    t.end();
});

test('month change event', function (t) {
    var control = new DateView({
        name: 'title'
    });

    control.render();
    var errorMessage = control.el.querySelector('[data-hook=message-container]');

    //start with month not filled in
    control.dayView.setValue('14', false);
    control.yearView.setValue('1980', false);
    control.handleInputChanged();
    control.beforeSubmit();
    t.equal(control.message.trim(), 'Month is required.');
    t.ok(!isHidden(errorMessage), 'error should be visible');

    //fill it in, message should go away
    control.monthView.setValue('3');
    control.handleInputChanged();
    control.beforeSubmit();
    t.ok(isHidden(errorMessage), 'error no longer shown');

    t.end();
});