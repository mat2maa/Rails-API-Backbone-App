App.Views.Index = (function (_super) {
  __extends(Index, _super);

  function Index() {
    return Index.__super__.constructor.apply(this, arguments);
  }

  Index.prototype.template = window['JST']['templates/index'];

  Index.prototype.initialize = function () {
    Index.__super__.initialize.apply(this, arguments);
    this.collection.on("sync", this.render, this);
    this.collection.fetch({
      headers: App.User.Headers
    });
  };

  Index.prototype.render = function () {
    console.log(this.collection.models);
    this.resetLayouts();
    $(this.el).html(this.template({
      users: this.collection.models
    }));
    return this;
  };

  return Index;

})(App.Views);
