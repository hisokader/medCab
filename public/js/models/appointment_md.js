define([
  'backbone'
  ],function(Backbone){
    var appointment = Backbone.Model.extend({
      urlRoot:'/appointments',
      idAttribute: "_id",
      defaults: {
          "fullDate": "",
          "patientId": "",
          "title": "",
          "type": "",
          "isConfirmed": ""
      }
    });
    
    return appointment;
});