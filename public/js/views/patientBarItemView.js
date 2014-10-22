define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!templates/patientBarItem.html',
        'js/views/messageBoxes/confirme',
        'js/models/template/messageBoxe',
        'js/views/editPatientModal'
    ],function($,_,Backbone,Template,confirmeMsgView,messageBoxesModel,editPatientModal){


    var patientBarItemView = Backbone.View.extend({

        tagName: 'li',

        template: _.template(Template),
        
        initialize: function () {
            _.bindAll(this, "render");
            this.model.bind('change', this.render);
        },

        events:{
            'click .event-close': 'destroy',
            'click .event-edit': 'edit'
        },

        destroy: function() {
            var self = this;
            var modal = new confirmeMsgView(new messageBoxesModel({
                "title": "Supprimer le patient",
                "text":"Êtes vous sûr de vouloir supprimer ce patient ?",
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
                            "text":"Le patient n'a pas été supprimé !!",
                            "type":"alert",
                            "confirmation":"ok"
                        })).render();
                    }
                });

            }).render();          
        },

        edit: function() {

            var modal = new editPatientModal(this.model).render(); 

            modal.$el.find('.default-date-picker').inputmask({"mask": "99/99/9999"});
            var dateNaissancee = modal.$el.find('.default-date-picker').datepicker({ 
                format: 'dd/mm/yyyy' 
            }).on('changeDate', function(ev) {
                dateNaissancee.hide(); 
            }).data('datepicker');        
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });
        
    return patientBarItemView;
});