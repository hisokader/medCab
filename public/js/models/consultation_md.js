define(['backbone'],function(Backbone){
    var consultation = Backbone.Model.extend({
      urlRoot:'/patients',
      defaults: {
          "DateConsultation": "",
          "Type": "",
          "Observations": "",
          "DatePayement": "",
          "Montant": "",
          "Avance": "",
          "Reste": "",
          "medicamentsList":[],
          "analyses":[]
      }
    });
    
    return consultation;
});