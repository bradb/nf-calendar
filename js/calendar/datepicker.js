var datepicker = (function() {
  'use strict';

  var insertSpace = function (el) {
    el.appendChild(document.createTextNode(' '));
  };

  var addMonthSelect = function(containerEl, prefix) {
    var months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'],
      elId = prefix + '-month';

    containerEl.appendChild(
      selectWidget.createSelect(
        elId, elId, months.map(function(v, i) { return [i + 1, v] } )
      )
    );
  };

  var addDaySelect = function(containerEl, prefix) {
    var days = [],
        elId = prefix + '-day';

    for (var i = 0; i <= 31; i++) {
      days.push([i + 1, i + 1]);
    }

    containerEl.appendChild(
      selectWidget.createSelect(elId, elId, days));
  };

  var addYearSelect = function (containerEl, prefix) {
    var years = [],
        thisYear = (new Date()).getFullYear(),
        elId = prefix + '-year';

    for (var i = thisYear - 1; i <= thisYear + 5; i++) {
      years.push([i, i]);
    }

    containerEl.appendChild(
      selectWidget.createSelect(elId, elId, years));
  };

  var datepicker = function(elId, prefix) {
    var containerEl = document.getElementById(elId);

    addMonthSelect(containerEl, prefix);
    insertSpace(containerEl);
    addDaySelect(containerEl, prefix);
    insertSpace(containerEl);
    addYearSelect(containerEl, prefix);
  };

  return { datepicker: datepicker };
})();
