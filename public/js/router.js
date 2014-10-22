define([
        'jquery',
        'backbone',
        'js/models/session',
        'js/models/patient_md',
        'js/models/user_md',
        'js/views/layout',
        'js/views/login',
        'js/collections/patient_cl',
        'js/collections/user_cl',
        'js/collections/consultation_cl',
        'js/views/messageBoxes/confirme',
        'js/models/template/messageBoxe',
        'js/views/patientstable',
        'js/views/patientProfile',
        'js/views/ajoutPatientContainer',
        'js/views/usersContainer',
        'js/views/calendar'
    ],function($,Backbone,Session,Patient_md,User_md,Layout,Login,Patient_cl,User_cl,Consultation_cl,confirmeMsgView,messageBoxesModel,patientsTableVw,PatientProfile,ajoutPatientContainer_vw,usersContainer_vw,Calendar){
    var Router = Backbone.Router.extend({
        routes: {
            "index":"dashboard",
            "login":"loginFn",
            "logout":"logoutFn",
            "forbidden":"forbiddenError",
            "patients":"allPatients",
            "patients/:id":"patientProfile",
            "addpatient":"addPatient",
            "users": "users",
            "calendar":"calendarPage"
        },
        initialize:function(){
            console.log('initialize router ! ');

            var self=this;
            this.currentView=null;
            this.session=new Session();
            this.ColPat = new Patient_cl();
            this.ColUsr = new User_cl();

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
            
            if(!this.session.isAuthenticated()) this.loginFn();
            else self.dashboard(); 

        },
        loginFn:function(){
            if(!this.session.isAuthenticated()){
                if(this.layout)this.layout.close();
                this.login=new Login(this).render();
            }else this.dashboard();
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
            if(this.layout)this.layout.close();
            this.layout=this.layout || new Layout(this);
            this.layout.render();
        },
        allPatients:function(){
            self=this;
            if(this.ColPat.length != 0){
                self.setCurentView(new patientsTableVw(self.ColPat).render());
            }else{
                self.ColPat.fetch({
                    success:function(){
                        self.setCurentView(new patientsTableVw(self.ColPat).render());
                    },
                    error:function(){
                        console.log('error fetch()');
                    }
                });
            }
        },
        patientProfile:function(id){
            var patient=new Patient_md({'_id':id});
            var PatCons=new Consultation_cl();
            var PatConsFltr=PatCons.where({"patient":id});
            console.log(new Backbone.Collection(PatConsFltr));
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
        calendarPage:function(){
            this.setCurentView(new Calendar().render());
        },
        addPatient:function(){
            self=this;
            if(this.ColPat.length != 0){
                self.setCurentView(new ajoutPatientContainer_vw(self.ColPat));
            }else{
                self.ColPat.fetch({
                    success:function(){
                        self.setCurentView(new ajoutPatientContainer_vw(self.ColPat));
                    },
                    error:function(){
                        console.log('error fetch()');
                    }
                });
            }
        },
        users:function(){
            self=this;
            if(this.ColUsr.length != 0){
                self.setCurentView(new usersContainer_vw(self.ColUsr));
            }else{
                self.ColUsr.fetch({
                    success:function(){
                        self.setCurentView(new usersContainer_vw(self.ColUsr));
                    },
                    error:function(){
                        console.log('error fetch() users');
                    }
                });
            }
        },


        /* helper methodes */
        
        setCurentView:function(newView){
            if(this.currentView) this.currentView.close(this.currentView);
            this.currentView=newView;
        }
    });
    return Router;
});