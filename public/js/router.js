define([
        'jquery',
        'backbone',
        './views/leftSideBar',
        './views/login',
        './collections/menu_cl'
    ],function($,Backbone,leftSideBar,login,menu_cl){
    var Router = Backbone.Router.extend({
        routes: {
            "index":"dashboard",
            "login":"login",
            "forbidden":"forbiddenError",
          "mdtest":         "wsx"
        },
        initialize:function(){
            console.log('initialize router ! ');
            var self=this;
            $.ajaxSetup({
                statusCode: {
                    401: function() {
                        self.navigate("/login", {trigger: true});
                    },
                    403: function() {
                        self.navigate("/forbidden", {trigger: true});
                    }
                }
            });
            this.dashboard();
        },
        login:function(){
            new login().render();
        },
        forbiddenError:function(){
            alert( "Forbidden !" );
        },
        dashboard:function(){
            $.get( "test", function( data ) {
                alert( "Load was performed."+data );
            });
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