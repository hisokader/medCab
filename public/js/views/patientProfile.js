define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/models/patient_md',
        'text!templates/patientProfile.html',
        'js/views/patientProfileTabs'
    ],function($,_,Backbone,Patients_md,Template,patientProfileTabs){
    
    var patientProfile_vw = Backbone.View.extend({
        tagName:'section',
        className:'wrapper',
        template: _.template(Template),
        events: {
           
        },
        initialize:function(patient){
            this.subViews=[];
            this.patient=patient;
            this.subViews.push(new patientProfileTabs());
            this.render();
        },
        render: function(){
          this.$el.html(this.template({patient:this.patient.toJSON()}));
          this.renderSubView('.profileTabs');
          $("#main-content").append(this.$el);
          return this;
        }
    });
    
    return patientProfile_vw;
});