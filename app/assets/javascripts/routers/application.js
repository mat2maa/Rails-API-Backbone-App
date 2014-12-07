App.Router = (function (_super) {
  __extends(Router, _super);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  // Initialize a new Router after login, navigate to the homepage and call Router.updateAfterLogin();
  //   var Router = new App.Router();
  //   Router.navigate("", { trigger: true });
  //   Router.updateAfterLogin();
  //
  // updateAfterLogin() contains initializer calls to all the models/collections that need to update:
  //   new App.Collections.Events();
  //
  // Then the initialize function for the models/collections updates what's necessary:
  //   this.url = App.Constants.APIBaseURL + 'accounts/' + App.User.ID + '/events';
  //
  Router.prototype.updateAfterLogin = function () {
    // Collections
    new App.Collections.Users();

    // Models
    new App.Models.User();
  };

  return Router;

})(Backbone.Router);
