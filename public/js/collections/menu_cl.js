define(['backbone','../models/menu_md'],function(Backbone,menu_md){
    var menu_cl = Backbone.Collection.extend({
      model:menu_md
    });
    return menu_cl;
});