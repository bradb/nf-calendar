var calendar = {
  renderRow: function(table, hour, minute, numDays) {
    var row = table.insertRow(),
        cell,
        timeslot;

    row.dataset.hour = hour;
    row.dataset.minute = minute;
    timeslot = row.insertCell();
    timeslot.className = 'timeslot';
    if (minute === 0) {
      timeslot.appendChild(
        document.createTextNode(this.formatHour(hour)));
    }

    for (d = 0; d < numDays; d++) {
        cell = row.insertCell();
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
    var thead = table.createTHead(),
        row = thead.insertRow(),
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        th;

    row.appendChild(document.createElement('th'));

    for (d = 0; d < numDays; d++) {
      th = row.appendChild(document.createElement('th'));
      th.appendChild(document.createTextNode(days[d]));
    }
  },

  calendar: function (containerId, numTimeslots, numDays) {
    var container = document.getElementById(containerId),
        table = this.renderTable(container),
        hour = 0,
        minute = 0;

    this.renderHeader(table, numDays);

    var tBody = table.createTBody();

    for(r = 0; r <= numTimeslots; r++) {
        this.renderRow(tBody, hour, minute, numDays);
        minute += 15;
        if (minute > 45) { minute = 0; }
        if (minute === 0) { hour += 1; }
    };

    this.bindClickHandlers(table);
  },

  bindClickHandlers: function(table) {
    var cells = table.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', this.handleCellClick)
    }
  },

  handleCellClick: function() {
    document.getElementsByClassName("modal-container")[0].style.display = 'block';
  }
}
