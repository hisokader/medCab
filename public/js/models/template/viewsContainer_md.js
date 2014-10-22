define(['backbone'],function(Backbone){
    var viewContainerMd = Backbone.Model.extend({
      defaults: {
          "title": "title",
          "largeur":"col-sm-12"
      }
    });
    return viewContainerMd;
});