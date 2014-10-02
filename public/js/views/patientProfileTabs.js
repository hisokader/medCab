define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/models/patient_md',
        'text!templates/patientProfileTabs.html',
        'js/views/patientProfileTabsConsForm',
    ],function($,_,Backbone,Patients_md,Template,TabsConsForm){
    
    var patientProfileTabs_vw = Backbone.View.extend({
        tagName:'section',
        className:'panel',
        template: _.template(Template),
        events: {
           
        },
        initialize:function(){
            this.subViews=[];
            this.subViews.push(new TabsConsForm());

        },
        render: function(){
          this.$el.html(this.template());
          this.renderSubView('.tab-content.tasi-tab');
          return this;
        }
    });
    return patientProfileTabs_vw;
});