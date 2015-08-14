var calendar = (function() {
  'use strict';

  var months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  var oneDay = (1000 * 60 * 60 * 24);

  var renderWeekRow = function(table, selectedDate, hour, minute) {
    var beginningOfWeek = getBeginningOfWeek(selectedDate),
        row = table.insertRow(),
        currentDay,
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
      currentDay = addDays(beginningOfWeek, d);

      cell = row.insertCell();
      cell.dataset.day = currentDay.getDate();
      cell.dataset.month = currentDay.getMonth() + 1;
      cell.dataset.year = currentDay.getFullYear();
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

  var getBeginningOfWeek = function(selectedDate) {
    var dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0) {
      return selectedDate;
    } else {
      return new Date(selectedDate.valueOf() - (dayOfWeek * oneDay));
    }
  };

  var ddMM = function (date) {
    var day = date.getDate(),
        month = date.getMonth() + 1;

    return zeroFill(day) + '/' + zeroFill(month);
  };

  var getEndOfWeek = function(selectedDate) {
    var dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 6) {
      return selectedDate;
    } else {
      return new Date(selectedDate.valueOf() + ((6 - dayOfWeek) * oneDay));
    }
  };

  var formatDate = function(date) {
    return dateMonth(date) + ' ' + zeroFill(date.getDate()) + ', ' + dateYear(date);
  };

  var dateYear = function(date) {
    return date.getFullYear();
  };

  var dateMonth = function(date) {
    return months[date.getMonth()].substr(0, 3);
  };

  var zeroFill = function(value) {
    return (value < 10) ? '0' + value.toString() : value.toString();
  };

  var formatTimeframeDates = function(startDate, endDate) {
    return formatDate(startDate) + ' - ' + formatDate(endDate);
  };

  var createWeekSelectorColumn = function(beginningOfWeek) {
    var timeframeSelectorColumn = document.createElement('th'),
        timeframeSelector = document.createElement('h2');

    timeframeSelector.appendChild(
      document.createTextNode(
        formatTimeframeDates(
          beginningOfWeek, getEndOfWeek(beginningOfWeek))));

    timeframeSelectorColumn.appendChild(timeframeSelector);
    timeframeSelectorColumn.colSpan = 7;
    timeframeSelectorColumn.style.width = '840px';
    timeframeSelectorColumn.style.textAlign = 'center';

    return timeframeSelectorColumn;
  };

  var createWeekSelector = function(row, beginningOfWeek) {
    var blankColumn,
        timeframeSelector;

    blankColumn = document.createElement('th');
    blankColumn.colSpan = 1;

    row.appendChild(blankColumn);
    row.appendChild(createWeekSelectorColumn(beginningOfWeek));
  };

  var addDays = function (date, days) {
    return (new Date(date.valueOf() + (days * oneDay)));
  };

  var renderWeekHeader = function(table, selectedDate) {
    var thead = table.createTHead(),
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        beginningOfWeek = getBeginningOfWeek(selectedDate),
        row,
        th;

    createWeekSelector(thead.insertRow(), beginningOfWeek);

    row = thead.insertRow();
    row.appendChild(document.createElement('th'));

    for (var d = 0; d < days.length; d++) {
      th = row.appendChild(document.createElement('th'));
      th.appendChild(
        document.createTextNode(
          days[d] + ' ' + ddMM(addDays(beginningOfWeek, d))));
    }
  };

  var renderWeekView = function (table, selectedDate, numTimeslots) {
    var hour = 0,
        minute = 0,
        tBody;

    renderWeekHeader(table, selectedDate);

    tBody = table.createTBody();

    for(var r = 0; r <= numTimeslots; r++) {
        renderWeekRow(tBody, selectedDate, hour, minute);
        minute += 15;
        if (minute > 45) { minute = 0; }
        if (minute === 0) { hour += 1; }
    }
  };

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
        message: "Invalid timeframe: " + timeframe };
    }

    bindClickHandlers(table);
  };

  var bindClickHandlers = function(table) {
    var cells = table.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', handleCellClick);
    }
  };

  var handleCellClick = function() {
    document.getElementsByClassName("modal-container")[0].style.display = 'block';
  };

  return { calendar: calendar };
})();
