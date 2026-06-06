(function () {
  var form = document.getElementById('registration-form');
  var password = document.getElementById('password');
  var confirm = document.getElementById('confirm-password');
  var error = document.getElementById('confirm-password-error');

  function validate() {
    if (confirm.value && password.value !== confirm.value) {
      error.textContent = 'Passwords do not match.';
      confirm.setCustomValidity('Passwords do not match.');
    } else {
      error.textContent = '';
      confirm.setCustomValidity('');
    }
  }

  password.addEventListener('input', validate);
  confirm.addEventListener('input', validate);

  form.addEventListener('submit', function (e) {
    validate();
    if (confirm.validity.customError) {
      e.preventDefault();
      confirm.focus();
    }
  });
})();
