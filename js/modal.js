var modal = (function() {
  'use strict';

  var modalEl,
      modalHtml =
      '<div class="modal-container" id="appointment-modal">' +
        '<div class="modal-form">' +
          '<h2>Appointment Date &amp; Time</h2>' +
          '<form action="#" method="post">' +
            '<div class="datepicker-container">' +
              '<h4>Day</h4>' +
              '<div id="datepicker"></div>' +
            '</div>' +
            '<div class="start-time-container">' +
              '<h4>Start Time</h4>' +
              '<div id="start-time-picker"></div>' +
            '</div>' +
            '<div class="end-time-container">' +
              '<h4>End Time</h4>' +
              '<div id="end-time-picker"></div>' +
            '</div>' +
            '<div class="buttons">' +
              '<a class="button" href="#">Book Appointment</a>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div>';

  var closeModal = function() {
    modalEl.style.display = "none";
  };

  var handleClickCancel = function(event) {
    if (event.target === modalEl) {
      closeModal();
    }
  };

  var handleEscCancel = function(event) {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  var modal = function(elementId) {
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    modalEl = document.getElementById(elementId);
    window.addEventListener('keydown', handleEscCancel);
    modalEl.addEventListener('click', handleClickCancel);
  };

  return { modal: modal };
})();
