App.Views.ChangePassword = (function (_super) {
  __extends(ChangePassword, _super);

  function ChangePassword() {
    return ChangePassword.__super__.constructor.apply(this, arguments);
  }

  ChangePassword.prototype.template = window['JST']['templates/change-password'];

  ChangePassword.prototype.events = {
    'submit .form': 'submitForm'
  };

  ChangePassword.prototype.initialize = function () {
    ChangePassword.__super__.initialize.apply(this, arguments);
    this.collectGarbage();
    this.render();
  };

  ChangePassword.prototype.submitForm = function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.sendForm(event.target, "PATCH");
  };

  ChangePassword.prototype.sendFormSuccess = function (data, status, xhr) {
    var Router = initializeRouter();
    Router.navigate("", { trigger: true });
    setFlashNotice(renderFlashNotice("success", "Your password was successfully changed. Please log in as usual."));
  };

  ChangePassword.prototype.render = function () {
    this.resetLayouts();

    var query = document.location.hash.split("?");
    query = query[query.length - 1];
    this.resetPasswordToken = query.split("=")[1];

    $(this.el).html(this.template({
      resetPasswordToken: this.resetPasswordToken
    }));
    return this;
  };

  return ChangePassword;

})(App.Views);
