App.Models.User = (function (_super) {
  __extends(User, _super);

  function User() {
    return User.__super__.constructor.apply(this, arguments);
  }

  User.prototype.initialize = function() {
    this.urlRoot = App.Constants.APIBaseURL + 'users/';
  };

  return User;

})(App.Models);