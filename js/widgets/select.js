var selectWidget = (function() {
  'use strict';

  var createOption = function(value, label) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.label = label;

    return opt;
  };

  var createSelect = function(name, options) {
    var select = document.createElement('select');
    select.name = name;

    for (var i = 0; i < options.length; i++) {
      select.add(createOption(options[i][0], options[i][1]));
    }

    return select;
  };

  return { createSelect: createSelect };
})();
