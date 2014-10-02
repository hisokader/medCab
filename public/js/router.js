define([
        'jquery',
        'backbone',
        'js/models/session',
        'js/models/patient_md',
        'js/views/layout',
        'js/views/login',
        'js/collections/patient_cl',
        'js/views/messageBoxes/confirme',
        'js/models/template/messageBoxe',
        'js/views/patientstable',
        'js/views/patientProfile'
    ],function($,Backbone,Session,Patient_md,Layout,Login,Patient_cl,confirmeMsgView,messageBoxesModel,patientsTableVw,PatientProfile){
    var Router = Backbone.Router.extend({
        routes: {
            "index":"dashboard",
            "login":"loginFn",
            "logout":"logoutFn",
            "forbidden":"forbiddenError",
            "patients":"allPatients",
            "patients/:id":"patientProfile"
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
            this.setCurentView(new patientsTableVw().render());
        },
        patientProfile:function(id){
            var patient=new Patient_md({'id':id}),
            self=this;
            patient.fetch({
                success:function(model, response, options){
                    console.log(model);
                    self.setCurentView(new PatientProfile(model));
                },
                error:function(model, response, options){
                    console(response);
                }
            });
        },


        /* helper methodes */
        
        setCurentView:function(newView){
            if(self.currentView)self.currentView.close()
            self.currentView=newView;
        }
    });
    return Router;
});