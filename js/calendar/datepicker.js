var datepicker = (function() {
  'use strict';

  var insertSpace = function (el) {
    el.appendChild(document.createTextNode(' '));
  };

  var addMonthSelect = function(containerEl) {
    var months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    containerEl.appendChild(
      selectWidget.createSelect(
        'date-month', 'date-month-', months.map(function(v, i) { return [i + 1, v] } )
      )
    );
  };

  var addDaySelect = function(containerEl) {
    var days = [];
    for (var i = 0; i <= 31; i++) {
      days.push([i + 1, i + 1]);
    }

    containerEl.appendChild(
      selectWidget.createSelect('date-day', 'date-day', days));
  };

  var addYearSelect = function (containerEl) {
    var years = [],
        thisYear = (new Date()).getFullYear();

    for (var i = thisYear - 1; i <= thisYear + 5; i++) {
      years.push([i, i]);
    }

    containerEl.appendChild(
      selectWidget.createSelect('date-year', 'date-year', years));
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
})();
