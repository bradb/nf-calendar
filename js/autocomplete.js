var autocomplete = (function () {
  'use strict';

  var autocompleteListClassName = 'autocomplete-list';

  var createOption = function (value, label) {
    var opt = document.createElement('li');
    opt.className = 'autocomplete-item';
    opt.dataset.value = value;
    opt.dataset.label = label;
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

  var handleOptionClick = function (event) {
    selectOption(event.target);
  };

  var enterKeyPressed = function (event) {
    return event.keyCode === 13;
  };

  var bindClickSelectHandler = function (list) {
    Array.prototype.forEach.call(list.querySelectorAll('li'), function (el) {
      el.addEventListener('click', handleOptionClick);
    });
  };

  var selectOption = function (option) {
    if (option) {
      var sourceEl =
        document.getElementById(option.parentNode.dataset.source);

      sourceEl.dataset.value = option.dataset.value;
      sourceEl.value = option.dataset.label;
      option.parentNode.remove();
    }
  };

  var bindEnterKeySelectHandler = function (sourceEl) {
    sourceEl.addEventListener('keypress', function (event) {
      if (enterKeyPressed(event)) {
        selectOption(
          document.querySelector(
            'ul.autocomplete-list[data-source=' + sourceEl.id + '] li.selected'));
      }
    });
  };

  var showCompletionOptions = function (sourceEl, searchText, options) {
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

    bindClickSelectHandler(list);

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

    bindEnterKeySelectHandler(inputEl);

    inputEl.addEventListener(
      'input',
      function(event) {
        showCompletionOptions(event.target, event.target.value, options);
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
