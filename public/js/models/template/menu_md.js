define(['backbone'],function(Backbone){
    var menu = Backbone.Model.extend({
      defaults: {
          "icon":  "caesar salad",
          "libelle":     "ravioli",
          "role":"0",
          "route":"#",
          "subMenu":[
              {"route":  "caesar salad","libelle":     "ravioli"},
              {"route":  "caesar salad","libelle":     "ravioli"},
              {"route":  "caesar salad","libelle":     "ravioli"},
          ]
      }
    });
    
    return menu;
});