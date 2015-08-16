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
    var list = document.createElement('ul');

    removeExistingCompletionList(sourceEl);
    if (!searchText) {
      return;
    }

    list.dataset.source = sourceEl.id;
    list.className = autocompleteListClassName;
    list.style.width = sourceEl.offsetWidth.toString() + 'px';

    options.forEach(function (opt) {
      list.appendChild(createOption(opt[0], opt[1]));
    });

    sourceEl.parentNode.insertBefore(list, sourceEl.nextSibling);
  };

  var autocomplete = function (elId, options) {
    var inputEl = document.getElementById(elId);

    inputEl.addEventListener(
      'keyup',
      function(event) {
        showCompleteOptions(event.target, event.target.value, options);
      });
  };

  return { autocomplete: autocomplete };
})();
