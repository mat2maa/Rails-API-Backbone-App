App.Views = (function (_super) {
  __extends(Views, _super);

  function Views() {
    return Views.__super__.constructor.apply(this, arguments);
  }

  Views.prototype.el = '.backbone-container';

  Views.prototype.initialize = function () {
    this.collectGarbage();
  };

  Views.prototype.resetLayouts = function () {
  };

  Views.prototype.collectGarbage = function () {
    this.undelegateEvents();
    $(this.el).removeData().unbind();
  };

  Views.prototype.openDatepicker = function (event) {
    $(event.target).prev('input').focus();
  };

  Views.prototype.selectFile = function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(event.target).next('.file-input').click();
  };

  Views.prototype.chooseImage = function (event) {
    var file = event.target.files[0], name = $(event.target).attr("name");

    if (!!file.type.match("image.*") && typeof FileReader !== "undefined" && file.size <= 4000000) {
      this.files.push({
        file: file,
        name: name
      });
      $('.form-message[data-for="' + name + '"]')
        .removeClass("form-alert")
        .addClass("form-notice")
        .html('<em>*Please save changes to update the image</em>');
      readURL(event.target);
    } else {
      $(event.target).val('');
      if (!file.type.match("image.*") || typeof FileReader === "undefined") {
        $('.form-message[data-for="' + name + '"]')
          .removeClass("form-notice")
          .addClass("form-alert")
          .html('<em>*File must be an image</em>');
      } else {
        $('.form-message[data-for="' + name + '"]')
          .removeClass("form-notice")
          .addClass("form-alert")
          .html("<em>*File size must be no larger than 1mb</em>");
      }
    }
  };

  Views.prototype.sendForm = function (selector, verb) {
    var action, form, filteredData, formData, that;
    form = $(selector);
    action = form.attr("action");
    filteredData = _.filter(form.serializeArray(), function(item) {
      return item.value !== "";
    });

    filteredData[filteredData.length] = { name: "pathname", value: window.location.pathname };

    formData = new FormData();
    _.each(filteredData, function(input) {
      if (input.value !== "") {
        formData.append(input.name, input.value);
      }
    });

    if (arguments[2]) {
      _.each(arguments[2], function(obj) {
        formData.append(obj.name, obj.file);
      });
    }

    that = this;

    $.ajax({
      type: verb,
      url: action,
      data: formData,
      processData: false,
      contentType: false,
      success: function (data, status, xhr) {
        that.sendFormSuccess(data, status, xhr);
      },
      error: function (xhr, status, error) {
        that.sendFormError(xhr, status, error);
      }
    });
  };

  Views.prototype.sendAuthenticatedForm = function (selector, verb) {
    var action, form, formData, that = this;

    form = $(selector);
    action = form.attr("action");

    formData = new FormData();
    _.each(form.serializeArray(), function(input) {
      if (input.value !== "") {
        formData.append(input.name, input.value);
      }
    });

    if (arguments[2]) {
      _.each(arguments[2], function(obj) {
        formData.append(obj.name, obj.file);
      });
    }

    $.ajax({
      type: verb,
      url: action,
      data: formData,
      processData: false,
      contentType: false,
      headers: App.User.Headers,
      success: function (data, status, xhr) {
        that.sendFormSuccess(data, status, xhr);
      },
      error: function (xhr, status, error) {
        that.sendFormError(xhr, status, error);
      }
    });
  };

  Views.prototype.sendAuthenticatedModal = function (url, verb, data) {
    var that = this;

    $.ajax({
      type: verb,
      url: url,
      data: data,
      headers: App.User.Headers,
      success: function (data, status, xhr) {
        that.sendFormSuccess(data, status, xhr);
      },
      error: function (xhr, status, error) {
        that.sendFormError(xhr, status, error);
      }
    });
  };

  Views.prototype.sendFormError = function (xhr, status, error) {
    $('.form-message')
      .removeClass("form-notice")
      .removeClass("form-alert")
      .html('');
    this.renderErrorMessage(xhr.responseText);
  };

  Views.prototype.login = function (data) {
    this.refreshUserSuccess(data, null, null);
    var Router = initializeRouter();
    Router.navigate("", { trigger: true });
    Router.updateAfterLogin();
    setFlashNotice(renderFlashNotice("success", "Successfully logged into account."));
  };

  Views.prototype.refreshUser = function () {
    var that = this;
    $.ajax({
      type: "GET",
      url: App.Constants.APIBaseURL + 'users/' + App.User.ID,
      headers: App.User.Headers,
      success: function (data, status, xhr) {
        that.refreshUserSuccess(data, status, xhr);
      },
      error: function (xhr, status, error) {
        that.refreshUserError(xhr, status, error);
      }
    });
  };

  Views.prototype.refreshUserSuccess = function (data, status, xhr) {
    window.User = data["user"];
    App.User.ID = User.id;
    App.User.APIKey = User.api_key;
    App.User.Username = User.username;
    if (User.avatar !== null) {
      App.User.Avatar = User.avatar;
    }
    App.User.Authenticated = true;
    App.User.Headers = { 'x-username': App.User.Username, 'x-api-key': App.User.APIKey };
    localStorage.setItem("rails_api_backbone_app_app_id", App.User.ID);
    localStorage.setItem("rails_api_backbone_app_api_key", App.User.APIKey);
    localStorage.setItem("rails_api_backbone_app_app_username", App.User.Username);
    if (App.User.Avatar) {
      localStorage.setItem("rails_api_backbone_app_app_avatar", App.User.Avatar);
    }
  };

  Views.prototype.refreshUserError = function (xhr, status, error) {
  };

  Views.prototype.logout = function (event) {
    event.preventDefault();
    killAll();
    window.location = '/';
  };

  Views.prototype.refreshAvatar = function(user) {
    App.User.Avatar = user.avatar.url;
    localStorage.setItem("rails_api_backbone_app_app_avatar", App.User.Avatar);
  };

  Views.prototype.renderErrorMessage = function (response) {
    var html;

    if (response !== "") {
      response = JSON.parse(response);
      if (response["message"]) {
        setFlashNotice(renderFlashNotice("danger", "<strong>Oops!</strong> " + response["message"]));
      } else if (response["errors"]) {
        if (typeof response["errors"] === "string") {
          html = '<strong>Oops!</strong> ' + response["errors"];
          setFlashNotice(renderFlashNotice("danger", html));
        } else {
          html = '<strong>Oops!</strong> There were the following errors:' +
            '<br>' +
            '<br>' +
            '<ul>';
          _.each(response["errors"], function (value, key) {
            html += '<li>' +
              capitalizeEachWord(key.split("_").join(" ")) + " " + value[0] +
              '</li>';
          });
          html += '</ul>';
          setFlashNotice(renderFlashNotice("danger", html));
        }
      } else {
        setFlashNotice(renderFlashNotice("danger", "<strong>Oops!</strong> Something went wrong, please try again."));
      }
    } else {
      setFlashNotice(renderFlashNotice("danger", "<strong>Oops!</strong> Please fill in the required fields in the form."));
    }
  };

  return Views;

})(Backbone.View);
