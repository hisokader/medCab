define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!templates/userTableItem.html',
        'js/views/messageBoxes/confirme',
        'js/models/template/messageBoxe',
        'js/views/editUserModal',
        'js/views/editUserPasswordModal'
    ],function($,_,Backbone,Template,confirmeMsgView,messageBoxesModel,editUserModal,editUserPasswordModal){
    
    var userTableItem_vw = Backbone.View.extend({
        tagName:'tr',
        template: _.template(Template),

        initialize:function(model){
            this.model=model;
            _.bindAll(this, "render");
            this.model.bind('change', this.render);
        },

        events:{
            'click .usr-close': 'destroy',
            'click .usr-edit': 'edit',
            'click .usr-editPassword': 'editPassword'
        },

        destroy: function() {
            var self = this;
            var modal = new confirmeMsgView(new messageBoxesModel({
                "title": "Supprimer l'utilisateur",
                "text":"Êtes vous sûr de vouloir supprimer cet utilisateur ?",
                "type":"dangerConfirm",
                "confirmation":"Supprimer"
            }),function(){
                self.model.destroy({
                    wait:true,
                    success: function(model, response) {
                        self.close();
                    },
                    error:function(model, response) {
                        var errorDestroyModal = new confirmeMsgView(new messageBoxesModel({
                            "title": "Problème coté serveur",
                            "text":"L'utilisateur n'a pas été supprimé !!",
                            "type":"alert",
                            "confirmation":"ok"
                        })).render();
                    }
                });

            }).render();          
        },

        edit: function() {
            var modal = new editUserModal(this.model).render();       
        },

        editPassword: function() {
            var modal = new editUserPasswordModal(this.model).render();       
        },

        render: function(){
            this.$el.html(this.template({user:this.model.toJSON()}));
          return this;
        },

    });
    
    return userTableItem_vw;
});