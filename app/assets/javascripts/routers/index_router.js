App.Router.Index = (function (_super) {
  __extends(Index, _super);

  function Index() {
    return Index.__super__.constructor.apply(this, arguments);
  }

  Index.prototype.routes = {
    '*notFound': 'notFound'
  };

  Index.prototype.initialize = function () {
    // Layouts
    this.setLayouts = function() {
    };

    // Unauthenticated routes
    // #
    this.route("", "index", function () {
      if (App.User.Authenticated) {
        this.navigate("", { trigger: true });
        setFlashNotice(renderFlashNotice("success", "You are already logged in."));
      } else {
        this.index();
      }
    });

    // #register
    this.route("register", "register", function () {
      if (App.User.Authenticated) {
        this.navigate("", { trigger: true });
        setFlashNotice(renderFlashNotice("success", "You are already logged in."));
      } else {
        this.register();
      }
    });

    // #login
    this.route("login", "login", function () {
      if (App.User.Authenticated) {
        this.navigate("", { trigger: true });
        setFlashNotice(renderFlashNotice("success", "You are already logged in."));
      } else {
        this.login();
      }
    });

    // #forgot-password
    this.route("forgot-password", "forgotPassword", function () {
      if (App.User.Authenticated) {
        this.navigate("", { trigger: true });
        setFlashNotice(renderFlashNotice("success", "You are already logged in."));
      } else {
        this.forgotPassword();
      }
    });

    // #change-password
    this.route("change-password", "changePassword", function () {
      if (App.User.Authenticated) {
        this.navigate("", { trigger: true });
        setFlashNotice(renderFlashNotice("success", "You are already logged in."));
      } else {
        this.changePassword();
      }
    });

    // Authenticated routes
    // #
    //    this.route("", "index", function () {
    //      if (App.User.Authenticated) {
    //        this.index();
    //      } else {
    //        window.location = '/';
    //      }
    //    });
  };

  Index.prototype.execute = function(callback, args) {
    // Empty all flash notices
    clearFlashNotice();
    if (callback) callback.apply(this, args);
    this.setLayouts();
  };

  Index.prototype.index = function () {
    console.log("Index");
    this.UsersCollection = new App.Collections.Users();
    this.IndexView = new App.Views.Index({
      collection: this.UsersCollection
    });
  };

  Index.prototype.register = function () {
    console.log("Register");
    this.RegisterView = new App.Views.Register();
  };

  Index.prototype.login = function () {
    console.log("Login");
    this.LoginView = new App.Views.Login();
  };

  Index.prototype.forgotPassword = function () {
    console.log("Forgot Password");
    this.ForgotPasswordView = new App.Views.ForgotPassword();
  };

  Index.prototype.changePassword = function () {
    console.log("Change Password");
    this.ChangePasswordView = new App.Views.ChangePassword();
  };

  Index.prototype.notFound = function () {
    console.log("404");
    this.navigate("", { trigger: true });
  };

  return Index;

})(App.Router);
