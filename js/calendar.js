var calendar = (function() {
  'use strict';

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const oneDay = (1000 * 60 * 60 * 24);

  var renderWeekRow = function(table, hour, minute) {
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

    for (var d = 0; d < 7; d++) {
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

  var getPeriodStartDate = function(selectedDate) {
    var dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0) {
      return selectedDate;
    } else {
      return new Date(selectedDate.valueOf() - (dayOfWeek * oneDay));
    }
  };

  var getPeriodEndDate = function(selectedDate) {
    var dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 6) {
      return selectedDate;
    } else {
      return new Date(selectedDate.valueOf() + ((6 - dayOfWeek) * oneDay));
    }
  };

  var formatDate = function(date) {
    return dateMonth(date) + ' ' + dateDay(date) + ', ' + dateYear(date);
  };

  var dateYear = function(date) {
    return date.getFullYear();
  }

  var dateMonth = function(date) {
    return months[date.getMonth()].substr(0, 3);
  };

  var dateDay = function(date) {
    var calDate = date.getDate();
    if (calDate < 10) {
      return '0' + calDate.toString();
    } else {
      return calDate.toString();
    }
  };

  var formatTimeframeDates = function(startDate, endDate) {
    return formatDate(startDate) + ' - ' + formatDate(endDate);
  }

  var createTimeframeSelectorColumn = function(selectedDate) {
    var timeframeSelectorColumn = document.createElement('th'),
        timeframeSelector = document.createElement('h2');

    timeframeSelector.appendChild(
      document.createTextNode(
        formatTimeframeDates(
          getPeriodStartDate(selectedDate),
          getPeriodEndDate(selectedDate))));

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
    row.appendChild(createTimeframeSelectorColumn(new Date()));
  };

  var renderWeekHeader = function(table, selectedDate) {
    var thead = table.createTHead(),
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        row,
        th;

    row = thead.insertRow();
    createTimeframeSelector(row);

    row = thead.insertRow();
    row.appendChild(document.createElement('th'));

    for (var d = 0; d < days.length; d++) {
      th = row.appendChild(document.createElement('th'));
      th.appendChild(document.createTextNode(days[d]));
    }
  };

  var renderWeekView = function (table, selectedDate, numTimeslots) {
    var hour = 0,
        minute = 0,
        tBody;

    renderWeekHeader(table, selectedDate);

    tBody = table.createTBody();

    for(var r = 0; r <= numTimeslots; r++) {
        renderWeekRow(tBody, hour, minute);
        minute += 15;
        if (minute > 45) { minute = 0; }
        if (minute === 0) { hour += 1; }
    };
  }

  var calendar = function (containerId, numTimeslots, selectedDate, timeframe) {
    var container = document.getElementById(containerId),
        table = renderTable(container),
        tBody,
        hour = 0,
        minute = 0;

    if (timeframe === 'week') {
      renderWeekView(table, selectedDate, numTimeslots);
    } else {
      throw {
        name: 'ArgumentException',
        message: "Invalid timeframe: " + timeframe }
    }

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
