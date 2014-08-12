define(['backbone'],function(Backbone){
    var menu = Backbone.Model.extend({
      defaults: {
          "icon":  "caesar salad",
          "libelle":     "ravioli",
          "subMenu":[
              {"route":  "caesar salad","libelle":     "ravioli"},
              {"route":  "caesar salad","libelle":     "ravioli"},
              {"route":  "caesar salad","libelle":     "ravioli"},
          ]
      }
    });
    
    return menu;
});