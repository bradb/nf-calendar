var autocomplete = (function () {
  'use strict';

  var autocompleteListClassName = 'autocomplete-list';

  var createOption = function (value, label) {
    var opt = document.createElement('li');
    opt.className = 'autocomplete-item';
    opt.dataset.value = value;
    opt.appendChild(document.createTextNode(label));

    return opt;
  };

  var removeExistingCompletionList = function (sourceEl) {
    Array.prototype.forEach.call(
      document.getElementsByClassName(autocompleteListClassName),
      function (el) {
        if (el.dataset.source === sourceEl.id) {
          el.remove();
        }
      }
    );
  };

  var showCompleteOptions = function (sourceEl, searchText, options) {
    var list = document.createElement('ul'),
        searchTextLowerCase = searchText.toLowerCase();

    removeExistingCompletionList(sourceEl);
    if (!searchText) {
      return;
    }

    list.dataset.source = sourceEl.id;
    list.className = autocompleteListClassName;
    list.style.width = sourceEl.offsetWidth.toString() + 'px';

    options.forEach(function (opt) {
      var value = opt[0],
          label = opt[1];

      if (label.toLowerCase().match('^' + searchTextLowerCase)) {
        list.appendChild(createOption(value, label));
      }
    });

    sourceEl.parentNode.insertBefore(list, sourceEl.nextSibling);
  };

  var downKeyPressed = function (event) {
    return event.keyCode === 40;
  };

  var upKeyPressed = function (event) {
    return event.keyCode === 38;
  };

  var getAutocompleteList = function (sourceEl) {
    return document.querySelector(".autocomplete-list[data-source='" + sourceEl.id + "']");
  };

  var selectNextCompleteOption = function (sourceEl) {
    var autocompleteList = getAutocompleteList(sourceEl);
    if (autocompleteList && autocompleteList.querySelector('li')) {
      selectItem(getNextSelectableItem(autocompleteList));
    }
  };

  var selectPreviousCompletionOption = function (sourceEl) {
    var autocompleteList = getAutocompleteList(sourceEl);
    if (autocompleteList && autocompleteList.querySelector('li')) {
      selectItem(getPreviousSelectableItem(autocompleteList));
    }
  };

  var getSelectedItem = function (list) {
    return list.querySelector("li.selected");
  };

  var getNextSelectableItem = function (list) {
    var currentSelectedItem = getSelectedItem(list);

    if (currentSelectedItem && currentSelectedItem.nextSibling) {
      return currentSelectedItem.nextSibling;
    } else {
      return list.querySelector('li:first-child');
    }
  };

  var getPreviousSelectableItem = function (list) {
    var currentSelectedItem = getSelectedItem(list);

    if (currentSelectedItem && currentSelectedItem.previousSibling) {
      return currentSelectedItem.previousSibling;
    } else {
      return list.querySelector('li:last-child');
    }
  };

  var selectItem = function (item) {
    Array.prototype.map.call(
      item.parentNode.querySelectorAll('li'),
      function (el) {
        el.classList.remove('selected');
    });

    item.classList.add('selected');
  };

  var autocomplete = function (elId, options) {
    var inputEl = document.getElementById(elId);

    inputEl.addEventListener(
      'input',
      function(event) {
        showCompleteOptions(event.target, event.target.value, options);
      });

    inputEl.addEventListener(
      'keydown',
      function(event) {
        if (downKeyPressed(event)) {
          selectNextCompleteOption(event.target);
        } else if (upKeyPressed(event)) {
          selectPreviousCompletionOption(event.target);
        }
      }
    );
  };

  return { autocomplete: autocomplete };
})();
