var calendar = (function() {
  'use strict';

  var months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  var oneHour = (1000 * 60 * 60);
  var oneDay = oneHour * 24;

  var renderWeekRow = function(table, selectedDate, hour, minute) {
    var beginningOfWeek = getBeginningOfWeek(selectedDate),
        row = table.insertRow(),
        currentDay,
        cellData,
        timeslot;

    timeslot = row.insertCell();
    timeslot.className = 'timeslot';
    if (minute === 0) {
      timeslot.appendChild(
        document.createTextNode(formatHour(hour)));
    }

    for (var d = 0; d < 7; d++) {
      currentDay = addDays(beginningOfWeek, d);

      cellData = row.insertCell().dataset;

      cellData.hour = hour;
      cellData.minute = minute;
      cellData.day = currentDay.getDate();
      cellData.month = currentDay.getMonth() + 1;
      cellData.year = currentDay.getFullYear();
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
        datePrefix = 'date',
        startTimePrefix = 'start',
        endTimePrefix = 'end',
        hour = 0,
        minute = 0,
        tBody;

    if (timeframe === 'week') {
      renderWeekView(table, selectedDate, numTimeslots);
    } else {
      throw {
        name: 'ArgumentException',
        message: "Invalid timeframe: " + timeframe };
    }

    modal.modal("appointment-modal");
    datepicker.datepicker('datepicker', datePrefix);
    timepicker.timepicker('start-time-picker', startTimePrefix);
    timepicker.timepicker('end-time-picker', endTimePrefix);
    autocomplete.autocomplete(
      "event-attendee", [[1, "Jamie Oliver", 2, "Nigel Slater"]]);

    bindClickHandlers(table, datePrefix, startTimePrefix, endTimePrefix);
  };

  var bindClickHandlers = function(table, datePrefix, startTimePrefix, endTimePrefix) {
    var cells = table.getElementsByTagName("td"),
        clickHandler = function(event) {
          var celldata = event.target.dataset,
              selectedDate = new Date(
                celldata.year,
                celldata.month,
                celldata.day,
                celldata.hour,
                celldata.minute);

          handleCellClick(event, selectedDate, datePrefix, startTimePrefix, endTimePrefix);
        };

    for (var i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', clickHandler);
    }
  };

  var selectDay = function (datePrefix, day, month, year) {
    document.getElementById(datePrefix + '-day').value = day;
    document.getElementById(datePrefix + '-month').value = month;
    document.getElementById(datePrefix + '-year').value = year;
  };

  var selectTime = function (prefix, selectedDate) {
    var selectedHour = function (h) {
      if (h === 0) {
        return 12;
      } else if (h > 12) {
        return h - 12;
      } else {
        return h;
      }
    };

    var ampm = function (h) {
      return h < 12 ? 'am' : 'pm';
    };

    document.getElementById(prefix + '-hour').value = selectedHour(selectedDate.getHours());
    document.getElementById(prefix + '-minute').value = selectedDate.getMinutes();
    document.getElementById(prefix + '-ampm').value = ampm(selectedDate.getHours());
  };

  var handleCellClick = function(event, selectedDate, datePrefix, startTimePrefix, endTimePrefix) {
    selectDay(datePrefix, selectedDate.getDate(), selectedDate.getMonth(), selectedDate.getFullYear());
    selectTime(startTimePrefix, selectedDate);
    selectTime(endTimePrefix, new Date(selectedDate.valueOf() + oneHour));
    document.getElementsByClassName("modal-container")[0].style.display = 'block';
  };

  return { calendar: calendar };
})();
