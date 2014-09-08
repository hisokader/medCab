define([
        'jquery',
        'backbone',
        'js/models/session',
        'js/views/layout',
        'js/views/login',
        'js/collections/patient_cl',
        'js/views/messageBoxes/confirme',
        'js/models/template/messageBoxe',
        'js/views/patientstable',
    ],function($,Backbone,Session,Layout,Login,Patient_cl,confirmeMsgView,messageBoxesModel,patientsTableVw){
    var Router = Backbone.Router.extend({
        routes: {
            "index":"dashboard",
            "login":"loginFn",
            "logout":"logoutFn",
            "forbidden":"forbiddenError",
            "patients":"allPatients"
        },
        initialize:function(){
            console.log('initialize router ! ');
            var self=this;
            this.currentView=null;
            this.session=new Session();
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
                        self.session.clear();
                        var modal = new confirmeMsgView(new messageBoxesModel({
                            "title": "Probleme d'authentification",
                            "text":"vous devez vous connectez d'abord pour avoir acces.",
                            "type":"alert",
                            "confirmation":"OK"
                        }),function(){
                            self.navigate("/login", {trigger: true});
                        }).render();
                    },
                    403: function() {
                        self.navigate("/forbidden", {trigger: true});
                    }
                }
            });
            if(!this.session.isAuthenticated())this.loginFn();
            else this.dashboard();
        },
        loginFn:function(){
            if(!this.session.isAuthenticated()){
                if(this.layout)this.layout.close();
                this.login=new Login(this).render();
            }else
                this.dashboard();
        },
        logoutFn:function(){
            if(this.session.isAuthenticated()){
                this.session.clear();
                this.navigate("/login", {trigger: true});
            }
        },
        forbiddenError:function(){
            if(this.layout)this.layout.close();
        },
        dashboard:function(){
            /*var modal = new confirmeMsgView(new messageBoxesModel({title:"myTitle",text:"dgdfgd",type:"dialoge"}),function(){
                console.log('thisis callback fn');
            });*/
            if(this.layout)this.layout.close();
            this.layout=this.layout || new Layout(this);
            this.layout.render();
            //modal.render();
        },
        allPatients:function(){
            console.log('ffff');
           var patientsTable=new patientsTableVw().render();
            /*var patients=new Patient_cl();
            patients.fetch({success:function(){
                console.log(JSON.stringify(patients));
                
                //patients.sync();
            }}).then(function(){
                var pat1=patients.at(1);
                pat1.destroy({success: function(model, response) {
                  console.log(model);
                }});
                console.log(JSON.stringify(patients));
            });*/
        }
    });
    return Router;
});