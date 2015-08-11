var modal = (function() {
  'use strict';

  var modalEl;

  var closeModal = function() {
    modalEl.style.display = "none";
  };

  var handleClickCancel = function(event) {
    if (event.target === modalEl) {
      closeModal();
    }
  };

  var handleEscCancel = function(event) {
    if (event.keyCode == 27) {
      closeModal();
    }
  };

  var modal = function(elementId) {
    modalEl = document.getElementById(elementId);
    window.addEventListener('keydown', handleEscCancel);
    modalEl.addEventListener('click', handleClickCancel)
  };

  return { modal: modal }
})()
