define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/models/patient_md',
        'text!templates/patientTableItem.html'
    ],function($,_,Backbone,Patients_cl,Template){
    
    var patientTableItem_vw = Backbone.View.extend({
        tagName:'tr',
        template: _.template(Template),
        events: {
        },
        initialize:function(model){
            this.model=model;
        },
        render: function(){
            var self=this;
            this.$el.html(this.template({patient:this.model.toJSON()}));
          return this;
        }
    });
    
    return patientTableItem_vw;
});