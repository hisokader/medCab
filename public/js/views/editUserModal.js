define(
    [
        'jquery',
        'backbone',
        'underscore',
        'js/models/session',
        'text!templates/editUserModal.html',
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
            this.session=new Session(),
            $(this.el).on('hidden.bs.modal', function (e) {
              self.close();
            });
        },

        validForm:function(){
            $("#editUserForm").validate({
                rules: {
                    Nom: "required",
                    Prenom: "required"
                },
                messages: {
                    Nom: "Veuillez saisir le nom d'utilisateur",
                    Prenom: "Veuillez saisir le prénom d'utilisateur"
                }
            });

            if($("#editUserForm").valid()){
                $("#editUserForm").submit();
            }
        },

        submit:function(e){
            e.preventDefault();

            var self=this;
            self.model.save({
                nom: self.$el.find('#Nom').val(),
                prenom: self.$el.find('#Prenom').val(),
                role: self.$el.find('#Role').val()
            },
            {
                success: function(model, response) {
                    $(self.el).modal('hide');
                    var successModal = new confirmeMsgView(new messageBoxesModel({
                        "title": "Modification éffectué",
                        "text":"Les informations ont été modifié avec succés !!",
                        "type":"successAlert",
                        "confirmation":"ok"
                    })).render();
                },
                error:function(model, response) {
                    $(self.el).modal('hide');
                    var errorModal = new confirmeMsgView(new messageBoxesModel({
                        "title": "Problème coté serveur",
                        "text":"Les informations n'ont pas été modifié !!",
                        "type":"alert",
                        "confirmation":"ok"
                    })).render();
                }
            });
            
            if(this.session.get('user')._id == self.model.get('_id')){
                this.session.set('user', JSON.stringify(self.model));
            }
            
        },

        render: function(){
            this.$el.attr({
                "tabindex":"-1",
                "role":"dialog",
                "aria-labelledby":'Editer les informations utilisateur',
                "aria-hidden":"true"
            });
            $(this.el).modal('show');
            //RoleUser=session.get('user').role;
            this.$el.html(this.template({model:this.model.toJSON()}));

            return this;
        }
    });
    
    return editUsrModal;
});