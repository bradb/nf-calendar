var autocomplete = (function () {
  'use strict';

  var optionsList = '<ul class="autocomplete-list"></ul>';

  var optionItem = '<li class="autocomplete-item"></li>';

  var showCompleteOptions = function (el, searchText, options) {
    alert("showing complete options");
  };

  var autocomplete = function (elId, options) {
    var inputEl = document.getElementById(elId);

    inputEl.addEventListener(
      'keypress',
      function(event) {
        showCompleteOptions(event.target, event.target.value, options);
      });
  };

  return { autocomplete: autocomplete };
})();
