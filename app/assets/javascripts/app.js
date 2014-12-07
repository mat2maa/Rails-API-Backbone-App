window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  User: {
    Abilities: {}
  },
  Constants: {
    APIBaseURL: '/api/v1/',
    APIHost: window.location.origin + '/'
  },
  initialize: function () {
    if (App.User.Authenticated) {
      var UserModel = new App.Models.User({
        id: App.User.ID
      });
      UserModel.fetch({
        headers: App.User.Headers,
        success: function (model, response, options) {
          // Set current user
          window.User = UserModel.get("user");
          // Initialize Router
          initializeRouter();
          Backbone.history.start();
        },
        error: function(model, response, options) {
          if (response.status === 401) {
            killAll();
            window.location = '/'
          }
        }
      });
    } else {
      initializeRouter();
      Backbone.history.start();
    }
  }
};

if (localStorage.getItem("rails_api_backbone_app_app_api_key")) {
  App.User.ID = localStorage.getItem("rails_api_backbone_app_app_id");
  App.User.APIKey = localStorage.getItem("rails_api_backbone_app_app_api_key");
  App.User.Username = localStorage.getItem("rails_api_backbone_app_app_username");
  if (localStorage.getItem("rails_api_backbone_app_app_avatar")) {
    App.User.Avatar = localStorage.getItem("rails_api_backbone_app_app_avatar");
  }
  App.User.Authenticated = true;
  window.App.User.Headers = { 'x-username': App.User.Username, 'x-api-key': App.User.APIKey };
}

$(document).ready(function () {
  App.initialize();
});

var killAll = function() {
  App.User.ID = null;
  App.User.APIKey = null;
  App.User.Username = null;
  App.User.Email = null;
  if (App.User.Avatar) {
    delete App.User.Avatar;
  }
  App.User.Authenticated = false;
  App.User.Headers = null;
  localStorage.removeItem("rails_api_backbone_app_app_id");
  localStorage.removeItem("rails_api_backbone_app_app_api_key");
  localStorage.removeItem("rails_api_backbone_app_app_username");
  localStorage.removeItem("rails_api_backbone_app_app_avatar");
};

var initializeRouter = function () {
  return new App.Router.Index();
};

// Flash Notices
setFlashNotice = function (notice) {
  $('.flash-notice').html(notice);
};

clearFlashNotice = function () {
  $('.flash-notice').html("");
};

renderFlashNotice = function (type, notice) {
  var template = window['JST']['templates/flash-notice'];
  return template({
    type: type,
    notice: notice
  });
};

// Imitate Ruby classes in JS. As in CoffeeScript
var __hasProp = {}.hasOwnProperty,
  __extends = function (child, parent) {
    for (var key in parent) {
      if (__hasProp.call(parent, key)) child[key] = parent[key];
    }
    function ctor() {
      this.constructor = child;
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
  };

// LocalStorage fallback
if (!window.localStorage) {
  Object.defineProperty(window, "localStorage", new (function () {
    var aKeys = [], oStorage = {};
    Object.defineProperty(oStorage, "getItem", {
      value: function (sKey) {
        return sKey ? this[sKey] : null;
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "key", {
      value: function (nKeyId) {
        return aKeys[nKeyId];
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "setItem", {
      value: function (sKey, sValue) {
        if (!sKey) {
          return;
        }
        document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "length", {
      get: function () {
        return aKeys.length;
      },
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "removeItem", {
      value: function (sKey) {
        if (!sKey) {
          return;
        }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    this.get = function () {
      var iThisIndx;
      for (var sKey in oStorage) {
        iThisIndx = aKeys.indexOf(sKey);
        if (iThisIndx === -1) {
          oStorage.setItem(sKey, oStorage[sKey]);
        }
        else {
          aKeys.splice(iThisIndx, 1);
        }
        delete oStorage[sKey];
      }
      for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) {
        oStorage.removeItem(aKeys[0]);
      }
      for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
        aCouple = aCouples[nIdx].split(/\s*=\s*/);
        if (aCouple.length > 1) {
          oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
          aKeys.push(iKey);
        }
      }
      return oStorage;
    };
    this.configurable = false;
    this.enumerable = true;
  })());
}

// String helpers
function capitalizeEachWord(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function gmtFromServerTime(str) {
  var d = new Date(str);
  return d.getDate() + "/" + parseInt(d.getMonth()+1) + "/" + d.getFullYear();
}

function getDateStatus(startsAtString, endsAtString) {
  var status = "", now = new Date(), startsAt = new Date(startsAtString), endsAt = new Date(endsAtString);

  if (startsAt > now) {
    status = 'future';
  } else if (startsAt <= now && endsAt > now) {
    status = 'current';
  } else {
    status = 'past';
  }

  return status;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var preview = $(input).data("preview"),
        $holder = $('.preview-holder[data-preview="' + preview + '"]');
      if ($holder.prop('tagName') === "IMG") {
        $holder.attr('src', e.target.result);
      } else if ($holder.prop('tagName') === "A") {
        $holder.css({
          'background-image': "url(" + e.target.result + ")",
          'background-size': 'cover'
        });
      } else {
        $holder.css('background-image', "url(" + e.target.result + ")");
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}