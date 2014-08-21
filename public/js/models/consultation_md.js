define(['backbone'],function(Backbone){
    var consultation = Backbone.Model.extend({
      defaults: {
          "Patient":  "",
          "DateConsultation": "",
          "Observations": "",
          "DatePayement": "",
          "Montant": "",
          "Avance": "",
          "Reste": "",
          "Devise": ""
      }
    });
    
    return consultation;
});