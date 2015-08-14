var timepicker = (function() {
  'use strict';

  var formatNumber = function(n) {
    return (n < 10) ? '0' + n.toString() : n.toString();
  };

  var timepicker = function(elId, prefix) {
    var select = document.getElementById(elId),
        hour_id_and_name = prefix + '-hour',
        minutes_id_and_name = prefix + '-minute',
        ampm_id_and_name = prefix + '-ampm',
        hours = [],
        minutes = [],
        i;

    for (i = 1; i <= 12; i++) {
      hours.push([i, formatNumber(i)]);
    }

    for (i = 0; i <= 59; i++) {
      minutes.push([i, formatNumber(i)]);
    }

    select.appendChild(
      selectWidget.createSelect(
        hour_id_and_name, hour_id_and_name, hours));
    select.appendChild(document.createTextNode(' : '));
    select.appendChild(
      selectWidget.createSelect(
        minutes_id_and_name, minutes_id_and_name, minutes));
    select.appendChild(document.createTextNode(' '));
    select.appendChild(
      selectWidget.createSelect(
        ampm_id_and_name, ampm_id_and_name, [['am', 'AM'], ['pm', 'PM']]));
  };

  return { timepicker: timepicker };
})();
