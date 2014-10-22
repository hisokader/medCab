define([
  'backbone'
  ],function(Backbone){
    var patient = Backbone.Model.extend({
      urlRoot:'/patients',
      idAttribute: "_id",
      defaults: {
          "lastName":  "",
          "firstName": "",
          "sexe": "",
          "dayBirth": "",
          "adress": "",
          "tel": "",
          "gsm": "",
          "job": "",
          "insurance": "",
          "diagnostique": "",
          "consultation":{}
      }
    });
    
    return patient;
});