App.Views.Login = (function (_super) {
  __extends(Login, _super);

  function Login() {
    return Login.__super__.constructor.apply(this, arguments);
  }

  Login.prototype.template = window['JST']['templates/login'];

  Login.prototype.events = {
    'submit .form': 'submitForm'
  };

  Login.prototype.initialize = function () {
    Login.__super__.initialize.apply(this, arguments);
    this.render();
  };

  Login.prototype.submitForm = function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.sendForm(event.target, "POST");
  };

  Login.prototype.sendFormSuccess = function (data, status, xhr) {
    this.login(data);
  };

  Login.prototype.render = function () {
    this.resetLayouts();

    $(this.el).html(this.template());
    return this;
  };

  return Login;

})(App.Views);
