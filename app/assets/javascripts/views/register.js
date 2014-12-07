App.Views.Register = (function (_super) {
  __extends(Register, _super);

  function Register() {
    return Register.__super__.constructor.apply(this, arguments);
  }

  Register.prototype.files = [];
  Register.prototype.template = window['JST']['templates/register'];

  Register.prototype.events = {
    'click .file': 'selectFile',
    'change #avatar_input': 'chooseImage',
    'submit .form': 'submitForm'
  };

  Register.prototype.initialize = function () {
    Register.__super__.initialize.apply(this, arguments);
    this.render();
  };

  Register.prototype.submitForm = function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.sendForm(event.target, "POST", this.files);
  };

  Register.prototype.sendFormSuccess = function (data, status, xhr) {
    $('.form-message')
      .removeClass("form-notice")
      .removeClass("form-alert")
      .html('');
    this.login(data);
  };

  Register.prototype.render = function () {
    this.resetLayouts();

    $(this.el).html(this.template());
    return this;
  };

  return Register;

})(App.Views);
