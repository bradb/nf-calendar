var calendar = (function() {
  'use strict';

  var renderRow = function(table, hour, minute, numDays) {
    var row = table.insertRow(),
        cell,
        timeslot;

    row.dataset.hour = hour;
    row.dataset.minute = minute;
    timeslot = row.insertCell();
    timeslot.className = 'timeslot';
    if (minute === 0) {
      timeslot.appendChild(
        document.createTextNode(formatHour(hour)));
    }

    for (var d = 0; d < numDays; d++) {
        cell = row.insertCell();
        cell.dataset.day = d;
    }
  };

  var formatHour = function(hour) {
    if (hour === 0) {
      return "Midnight";
    } else if (hour < 12) {
      return hour + " AM";
    } else if (hour === 12) {
      return "Noon";
    } else {
      return (hour - 12) + " PM";
    }
  };

  var renderTable = function(container) {
    var table = container.appendChild(document.createElement('table'));
    table.className = 'calendar';
    return table;
  };

  var createTimeframeSelectorColumn = function() {
    var timeframeSelectorColumn = document.createElement('th'),
        timeframeSelector = document.createElement('h2');

    timeframeSelector.appendChild(document.createTextNode('August 9 - 15, 2015'));

    timeframeSelectorColumn.appendChild(timeframeSelector);
    timeframeSelectorColumn.colSpan = 7;
    timeframeSelectorColumn.style.width = '840px';
    timeframeSelectorColumn.style.textAlign = 'center';

    return timeframeSelectorColumn;
  };

  var createTimeframeSelector = function(row) {
    var blankColumn,
        timeframeSelector;

    blankColumn = document.createElement('th');
    blankColumn.colSpan = 1;

    row.appendChild(blankColumn);
    row.appendChild(createTimeframeSelectorColumn());
  };

  var renderHeader = function(table, numDays) {
    var thead = table.createTHead(),
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        row,
        th;

    row = thead.insertRow();
    createTimeframeSelector(row);

    row = thead.insertRow();
    row.appendChild(document.createElement('th'));

    for (var d = 0; d < numDays; d++) {
      th = row.appendChild(document.createElement('th'));
      th.appendChild(document.createTextNode(days[d]));
    }
  };

  var calendar = function (containerId, numTimeslots, numDays) {
    var container = document.getElementById(containerId),
        table = renderTable(container),
        hour = 0,
        minute = 0;

    renderHeader(table, numDays);

    var tBody = table.createTBody();

    for(var r = 0; r <= numTimeslots; r++) {
        renderRow(tBody, hour, minute, numDays);
        minute += 15;
        if (minute > 45) { minute = 0; }
        if (minute === 0) { hour += 1; }
    };

    bindClickHandlers(table);
  };

  var bindClickHandlers = function(table) {
    var cells = table.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', handleCellClick)
    }
  };

  var handleCellClick = function() {
    document.getElementsByClassName("modal-container")[0].style.display = 'block';
  };

  return { calendar: calendar }
})();
