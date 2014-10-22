define(
    [
        'jquery',
        'backbone',
        'underscore',
        'js/models/session',
        'text!templates/editPatientModal.html',
        'js/views/messageBoxes/confirme',
        'js/models/template/messageBoxe',
        'moment'
    ],function($,Backbone,_,Session,Template,confirmeMsgView,messageBoxesModel,Moment){

    var editPatModal = Backbone.View.extend({
        className:'modal fade',
        id:'myModal',
        tagName: 'div',
        events: {
            "click .submitForm": "validForm",
            "submit": "submit"
        },

        template: _.template(Template),

        initialize:function(model){
            var self=this;
            this.model=model;
            $(this.el).on('hidden.bs.modal', function (e) {
              self.close();
            });
        },

        validForm:function(){
            $("#editPatientForm").validate({
                rules: {
                    lastName: "required",
                    firstName: "required",
                    tel: {
                        digits: true,
                        minlength: 10
                    },
                    gsm: {
                        digits: true,
                        minlength: 10                  
                    }
                    //diagnostique: "required"
                },
                messages: {
                    lastName: "Veuillez saisir le nom du patient",
                    firstName: "Veuillez saisir le prénom du patient",
                    tel: {
                        digits: "Veuillez saisir seulement des chiffres",
                        minlength: "Le numéro du télephone doit être composé de 10 chiffres au moins"
                    },
                    gsm: {
                        digits: "Veuillez saisir seulement des chiffres",
                        minlength: "Le numéro du télephone doit être composé de 10 chiffres au moins"
                    }
                    /*diagnostique: {
                        required: "Veuillez saisir les détails du diagnostique"
                    }*/
                }
            });
            if($("#editPatientForm").valid()){
                $("#editPatientForm").submit();
            }
        },

        submit:function(e){
            e.preventDefault();

            var self=this;
            self.model.save({
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
                success: function(model, response) {
                    $(self.el).modal('hide');
                    var successModal = new confirmeMsgView(new messageBoxesModel({
                        "title": "Modification éffectué",
                        "text":"Les informations ont été modifiées avec succés !!",
                        "type":"successAlert",
                        "confirmation":"ok"
                    })).render();
                },
                error:function(model, response) {
                    $(self.el).modal('hide');
                    var errorModal = new confirmeMsgView(new messageBoxesModel({
                        "title": "Problème coté serveur",
                        "text":"Le patient n'a pas été modifié !!",
                        "type":"alert",
                        "confirmation":"ok"
                    })).render();
                }
            });

            
        },

        render: function(){
            this.$el.attr({
                "tabindex":"-1",
                "role":"dialog",
                "aria-labelledby":'Editer le patient',
                "aria-hidden":"true"
            });
            $(this.el).modal('show');
            var session=new Session(),
            RoleUser=session.get('user').role;
            var naissanceDate = Moment(this.model.attributes.dayBirth).format('DD/MM/YYYY');
            this.$el.html(this.template({model:this.model.toJSON(), role:RoleUser, DtNaissance:naissanceDate}));

            return this;
        }
    });
    
    return editPatModal;
});