define(['backbone'],function(Backbone){
    var patient = Backbone.Model.extend({
      defaults: {
          "Nom":  "",
          "Prenom": "",
          "Sexe": "",
          "DateNaissance": "",
          "Adresse": "",
          "Fixe": "",
          "Gsm": "",
          "Profession": "",
          "mutuelliste": "",
          "diagnostique": "",

      }
    });
    
    return patient;
});