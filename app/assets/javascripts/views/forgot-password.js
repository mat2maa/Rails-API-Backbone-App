App.Views.ForgotPassword = (function (_super) {
  __extends(ForgotPassword, _super);

  function ForgotPassword() {
    return ForgotPassword.__super__.constructor.apply(this, arguments);
  }

  ForgotPassword.prototype.template = window['JST']['templates/forgot-password'];

  ForgotPassword.prototype.events = {
    'submit .form': 'submitForm'
  };

  ForgotPassword.prototype.initialize = function () {
    ForgotPassword.__super__.initialize.apply(this, arguments);
    this.collectGarbage();
    this.render();
  };

  ForgotPassword.prototype.submitForm = function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.sendForm(event.target, "POST");
  };

  ForgotPassword.prototype.sendFormSuccess = function (data, status, xhr) {
    var Router = initializeRouter();
    Router.navigate("", { trigger: true });
    setFlashNotice(renderFlashNotice("success", "An email with instructions was sent."));
  };

  ForgotPassword.prototype.render = function () {
    this.resetLayouts();

    $(this.el).html(this.template());
    return this;
  };

  return ForgotPassword;

})(App.Views);
