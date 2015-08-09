var Calendar = {
  renderRow: function(table, hour, minute, numDays) {
    var row = table.appendChild(document.createElement("tr")),
        cell,
        timeslot;

    row.dataset.hour = hour;
    row.dataset.minute = minute;
    timeslot = row.appendChild(document.createElement('td'));
    timeslot.className = 'timeslot';
    if (minute === 0) {
      timeslot.appendChild(
        document.createTextNode(this.formatHour(hour)));
    }

    for (d = 0; d < numDays; d++) {
        cell = row.appendChild(document.createElement("td"));
        cell.dataset.day = d;
    }
  },

  formatHour: function(hour) {
    if (hour == 0) {
      return "Midnight";
    } else if (hour < 12) {
      return hour + " AM";
    } else if (hour == 12) {
      return "Noon";
    } else {
      return (hour - 12) + " PM";
    }
  },

  renderTable: function(container) {
    var table = container.appendChild(document.createElement('table'));
    table.className = 'calendar';
    return table;
  },

  renderHeader: function(table, numDays) {
    var thead = table.appendChild(document.createElement('thead')),
        row = thead.appendChild(document.createElement('tr')),
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        th;

    row.appendChild(document.createElement('th'));

    for (d = 0; d < numDays; d++) {
      th = row.appendChild(document.createElement('th'));
      th.appendChild(document.createTextNode(days[d]));
    }
  },

  showCalendar: function (containerId, numTimeslots, numDays) {
    var container = document.getElementById(containerId);
    var table = this.renderTable(container);

    this.renderHeader(table, numDays);

    var hour = 0,
        minute = 0,
        tbody = table.appendChild(document.createElement('tbody'));

    for(r = 0; r <= numTimeslots; r++) {
        this.renderRow(tbody, hour, minute, numDays);
        minute += 15;
        if (minute > 45) { minute = 0; }
        if (minute === 0) { hour += 1; }
    };
  }
}
