define([
  'backbone'
  ],function(Backbone){
    var user = Backbone.Model.extend({
      idAttribute: "_id",
      urlRoot:'/users',
      defaults: {
          "nom" : "",
          "prenom" : "",
          "role" : "",
          "salt":"",
          "username" : "",
          "password" : ""
      }
    });
    
    return user;
});