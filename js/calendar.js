var Calendar = {
  renderRow: function(table, hour, minute, numDays) {
    var row = table.appendChild(document.createElement("tr")),
        cell;

    row.dataset.hour = hour;
    row.dataset.minute = minute;
    for (d = 0; d < numDays; d++) {
        cell = row.appendChild(document.createElement("td"));
        cell.dataset.day = d;
    }
  },

  renderTable: function(container) {
    var table = container.appendChild(document.createElement('table'));
    table.className = 'calendar';
    return table;
  },

  showCalendar: function (containerId, numTimeslots, numDays) {
    var container = document.getElementById(containerId);
    var table = this.renderTable(container);

    var hour = 0,
        minute = 0;
    for(r = 0; r <= numTimeslots; r++) {
        this.renderRow(table, hour, minute, numDays);
        minute += 15;
        if (minute > 45) { minute = 0; }
        if (minute == 0) { hour += 1; }
    };
  }
}
