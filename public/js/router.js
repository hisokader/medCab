define(['jquery','backbone','./views/leftSideBar','./collections/menu_cl'],function($,Backbone,leftSideBar,menu_cl){
    var Router = Backbone.Router.extend({
        routes: {
          "mdtest":         "wsx"
        },
        initialize:function(){
            console.log('initialize router ! ');
            this.wsx();
        },
        wsx:function(){
            var collection=new menu_cl();
            collection.add({
                "icon":  "fa-dashboard",
                "libelle":     "dashboard",
                "subMenu":null
              });
            collection.add({
                "icon":  "fa-users",
                "libelle":     "Patient"
              });
            collection.add({
                "icon":  "fa-pencil-square-o",
                "libelle":     "Consultation",
                "subMenu":[]
              });
            
            collection.add({
                "icon":  "fa-calendar",
                "libelle":     "Agenda"
              });
            
            collection.add({
                "icon":  "fa-keyboard-o",
                "libelle":     "Comptabilite"
              });
            new leftSideBar({collection:collection}).render();
        }
    });
    return Router;
});