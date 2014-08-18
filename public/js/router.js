define([
        'jquery',
        'backbone',
        '../js/models/session',
        '../js/views/leftSideBar',
        '../js/views/navProfile',
        '../js/views/login',
        '../js/collections/menu_cl'
    ],function($,Backbone,Session,LeftSideBar,NavProfile,Login,Menu_cl){
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
            alert( "Forbidden !" );
        },
        dashboard:function(){
            $.get( "test", function( data ) {
                alert( "Load was performed."+data );
            });
        },
        wsx:function(){
            var profile=new NavProfile().render(eval(Session.get('user')).nom);
            var collectionx=new Menu_cl();
            var leftSideBar=new LeftSideBar({collection:collectionx}).render(eval(Session.get('user')).role);
        }
    });
    return Router;
});