define(['backbone'],function(Backbone){
    var messageBox = Backbone.Model.extend({
      defaults: {
          "title": "title",
          "text":"text",
          "type":"confirme",//confirme, dialoge, alert
          "cancel":"Annuler",
          "confirmation":"Confirmer"
      }
    });
    return messageBox;
});