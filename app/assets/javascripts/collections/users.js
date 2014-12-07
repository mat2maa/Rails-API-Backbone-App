App.Collections.Users = (function (_super) {
  __extends(Users, _super);

  function Users() {
    return Users.__super__.constructor.apply(this, arguments);
  }

  Users.prototype.url = App.Constants.APIBaseURL + 'users';

  Users.prototype.model = App.Models.User;

  Users.prototype.parse = function(response) {
    return response.users;
  };

  return Users;

})(App.Collections);
