define([
        'jquery',
        'backbone',
        'js/models/session',
        'js/views/layout',
        'js/views/login',
        'js/collections/patient_cl',
    ],function($,Backbone,Session,Layout,Login,Patient_cl){
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
            this.csurfToken=$('meta[name=csrf-token]').attr("content");
            $.ajaxSetup({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('x-csrf-token',self.csurfToken);
                },
                complete: function(xhr) {
                    self.csurfToken=xhr.getResponseHeader('x-csrf-token');
                },
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
            /*if(!Session.isAuthenticated())this.login();
            else*/ this.wsx();
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
            var patients=new Patient_cl();
            patients.fetch({success:function(){
                console.log(JSON.stringify(patients));
                
                //patients.sync();
            }}).then(function(){
                var pat1=patients.at(1);
                pat1.destroy({success: function(model, response) {
                  console.log(model);
                }});
                console.log(JSON.stringify(patients));
            });
            
        }
    });
    return Router;
});