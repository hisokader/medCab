define([
  'backbone'
  ],function(Backbone){
    var patient = Backbone.Model.extend({
      urlRoot:'/patients',
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
      }
    });
    
    return patient;
});