define([
        'jquery',
        'backbone',
        '../js/models/session',
        '../js/views/layout',
        '../js/views/login'
    ],function($,Backbone,Session,Layout,Login){
    var Router = Backbone.Router.extend({
        routes: {
            "index":"dashboard",
            "login":"login",
            "forbidden":"forbiddenError",
          "mdtest": "wsx"
        },
        initialize:function(){
            console.log('initialize router ! ');
            var self=this;
            $.ajaxSetup({
                statusCode: {
                    401: function() {
                        Session.clear();
                        self.navigate("/login", {trigger: true});
                    },
                    403: function() {
                        self.navigate("/forbidden", {trigger: true});
                    }
                }
            });
            if(!Session.isAuthenticated())this.login();
            else this.wsx();
        },
        login:function(){
            var loginView=new Login().render();
        },
        forbiddenError:function(){
            if(this.layout)this.layout.close();
        },
        dashboard:function(){
            $.get( "test", function( data ) {
                alert( "Load was performed."+data );
            });
            this.layout.close();
        },
        wsx:function(){
            this.layout=new Layout().render();
        }
    });
    return Router;
});