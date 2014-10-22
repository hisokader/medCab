define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/models/session',
        'text!templates/ajoutPatient.html',
        'js/views/messageBoxes/confirme',
        'js/models/template/messageBoxe',
        'js/views/viewsContainerView',
        'js/models/template/viewsContainer_md',
        'js/views/patientBarListView'
    ],function($,_,Backbone,Session,Template,confirmeMsgView,messageBoxesModel,viewsContainerView,viewsContainerMd,patientBarListView){
    
    var ajoutP_vw = Backbone.View.extend({

        template: _.template(Template),

        initialize:function(col){
            var self=this;
            var session=new Session(),
            RoleUser=session.get('user').role;
            self.$el.append(self.template({role:RoleUser}));
            this.collection = col;
            //this.render();
            
        },

        events: {
            'submit': 'addContact'
        },

        addContact: function(e){
            e.preventDefault();
            var self = this;
            self.collection.create({
                lastName: self.$el.find('#lastName').val(),
                firstName: self.$el.find('#firstName').val(),
                dayBirth: self.$el.find('#dayBirth').val(),
                sexe: self.$el.find("input:radio[name=sexe]:checked").val(),
                adress: self.$el.find('#adress').val(),
                tel: self.$el.find('#tel').val(),
                gsm: self.$el.find('#gsm').val(),
                job: self.$el.find('#job').val(),
                insurance: self.$el.find("input:radio[name=insurance]:checked").val(),
                diagnostique: self.$el.find('#diagnostique').val()
            },
            {
                wait:true,
                success: function(model, response) {
                    var modal = new confirmeMsgView(new messageBoxesModel({
                            "title": "Ajout éffectué",
                            "text":"Le patient a bien été ajouté !!",
                            "type":"successAlert",
                            "confirmation":"ok"
                        })).render();
                        //self.close();

                },
                error:function(model, response) {
                    var modal = new confirmeMsgView(new messageBoxesModel({
                            "title": "Problème coté serveur",
                            "text":"Le patient n'a pas été ajouté !!",
                            "type":"alert",
                            "confirmation":"ok"
                        })).render();
                }
            });
        },

        render: function(){

            var self = this;
            
            self.AddPatContainer = new viewsContainerView(new viewsContainerMd({
                            "title": "Nouveau patient",
                            "largeur":"col-sm-8"
                        }), self).render();

            return self.AddPatContainer;
        }


    });

    return ajoutP_vw;
});