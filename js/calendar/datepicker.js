var datepicker = (function() {
  'use strict';

  var insertSpace = function (el) {
    el.appendChild(document.createTextNode(' '));
  }

  var createOption = function(value, label) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.label = label;

    return opt;
  }

  var createSelect = function(name, options) {
    var select = document.createElement('select');
    select.name = name;

    for (var i = 0; i < options.length; i++) {
      select.add(createOption(options[i][0], options[i][1]));
    }

    return select;
  }

  var addMonthSelect = function(containerEl) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    containerEl.appendChild(
      createSelect(
        'month', months.map(function(v, i) { return [i + 1, v] } )
      )
    );
  };

  var addDaySelect = function(containerEl) {
    var days = [];
    for (var i = 0; i <= 31; i++) {
      days.push([i + 1, i + 1]);
    }

    containerEl.appendChild(createSelect('day', days));
  };

  var addYearSelect = function (containerEl) {
    var years = [],
        thisYear = (new Date()).getFullYear();

    for (var i = thisYear - 1; i <= thisYear + 5; i++) {
      years.push([i, i]);
    }

    containerEl.appendChild(createSelect('year', years));
  };

  var datepicker = function(selectorId) {
    var containerEl = document.getElementById(selectorId);

    addMonthSelect(containerEl);
    insertSpace(containerEl);
    addDaySelect(containerEl);
    insertSpace(containerEl);
    addYearSelect(containerEl);
  };

  return { datepicker: datepicker };
})()
