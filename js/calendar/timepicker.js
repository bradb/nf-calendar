var timepicker = (function() {
  'use strict';

  var formatNumber = function(n) {
    return (n < 10) ? '0' + n.toString() : n.toString();
  }

  var timepicker = function(elId, prefix) {
    var select = document.getElementById(elId),
        hours = [],
        minutes = [];

    for (var i = 1; i <= 12; i++) {
      hours.push([i, formatNumber(i)]);
    }

    for (var i = 0; i <= 59; i++) {
      minutes.push([i, formatNumber(i)]);
    }

    select.appendChild(selectWidget.createSelect(prefix + '-hour', hours))
    select.appendChild(document.createTextNode(' : '));
    select.appendChild(selectWidget.createSelect(prefix + '-minute', minutes));
    select.appendChild(document.createTextNode(' '));
    select.appendChild(selectWidget.createSelect(prefix + '-ampm', [['am', 'AM'], ['pm', 'PM']]))
  };

  return { timepicker: timepicker };
})();
