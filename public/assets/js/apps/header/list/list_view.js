Platform.module("HeaderApp.List", function(List, Platform, Backbone, Marionette, $, _){
  List.Header = Marionette.ItemView.extend({
    template: "#header-link",
    tagName: "li",

    events: {
      "click a": "navigate"
    },

    navigate: function(e){
      e.preventDefault();
      this.trigger("navigate", this.model);
    },

    onRender: function(){
      if(this.model.selected){
        // add class so Bootstrap will highlight the active entry in the navbar //
        this.$el.addClass("active");
      }
    },

    serializeData: function(){
      var model = this.model;
      var loggedIn = Platform.request("isAuthenticated:entities");
      if(model.get("name") === "Logout" && loggedIn === null){
        model.set({
          name: "Login",
          url: "login",
          navigationTrigger: "user:login"
        })
      }
      if(model.get("name") === "Login" && loggedIn !== null){
        model.set({
          name: "Logout",
          url: "logout",
          navigationTrigger: "logout"
        })
      }

      return {
         name: model.get("name"),
         url: model.get("url"), 
         navigationTrigger: model.get("navigationTrigger"),
      }
    }
  });

  List.Headers = Marionette.CompositeView.extend({
    template: "#header-template",
    tagName: "nav",
    className: "navbar navbar-default",
    childView: List.Header,
    childViewContainer: "ul",

    events: {
      "click a.brand": "brandClicked"
    },

    brandClicked: function(e){
      e.preventDefault();
      this.trigger("brand:clicked");
    }
  });

  List.User = Marionette.ItemView.extend({
    template: "#user-name",
    tagName: "footer",
    className: "footer",

    serializeData: function () {
      var model = this.model;

      return {
          userName: model.get("userName"),
          admin: Platform.request("getPermissions:entities"),
      };
    },

  })

});