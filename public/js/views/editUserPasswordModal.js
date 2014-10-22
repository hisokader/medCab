define(
    [
        'jquery',
        'backbone',
        'underscore',
        'js/models/session',
        'text!templates/editUserPasswordModal.html',
        'js/views/messageBoxes/confirme',
        'js/models/template/messageBoxe'
    ],function($,Backbone,_,Session,Template,confirmeMsgView,messageBoxesModel){

    var editUsrModal = Backbone.View.extend({
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
            $("#editUserPasswordForm").validate({
                rules: {
                    AnPassword: {
                        required: true,
                        minlength: 6
                    },
                    NvPassword: {
                        required: true,
                        minlength: 6
                    },
                    NvPasswordConfirm: {
                        required: true,
                        equalTo: '#NvPassword'
                    }
                },
                messages: {
                    AnPassword: {
                        required: "Veuillez saisir votre ancien mot de passe",
                        minlength: "Le mot de passe doit être composé de plus de 6 caractères"
                    },
                    NvPassword: {
                        required: "Veuillez saisir le nouveau mot de passe",
                        minlength: "Le mot de passe doit être composé de plus de 6 caractères"
                    },
                    NvPasswordConfirm: {
                        required: "Veuillez confirmer le nouveau mot de passe",
                        equalTo: "les mots de passes ne sont pas identiques"
                    }
                }
            });

            if($("#editUserPasswordForm").valid()){
                $("#editUserPasswordForm").submit();
            }
        },

        submit:function(e){
            e.preventDefault();

            var self=this;
            self.model.save({
                password: self.$el.find('#NvPassword').val()
            },
            {
                success: function(model, response) {
                    $(self.el).modal('hide');
                    var successModal = new confirmeMsgView(new messageBoxesModel({
                        "title": "Modification éffectué",
                        "text":"Le mot de passe a été modifié avec succés !!",
                        "type":"successAlert",
                        "confirmation":"ok"
                    })).render();
                },
                error:function(model, response) {
                    $(self.el).modal('hide');
                    var errorModal = new confirmeMsgView(new messageBoxesModel({
                        "title": "Problème coté serveur",
                        "text":"Le mot de passe n'a pas été modifié !!",
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
                "aria-labelledby":'Editer le mot de passe',
                "aria-hidden":"true"
            });
            $(this.el).modal('show');
            //var session=new Session(),
            //RoleUser=session.get('user').role;
            this.$el.html(this.template({model:this.model.toJSON()}));

            return this;
        }
    });
    
    return editUsrModal;
});