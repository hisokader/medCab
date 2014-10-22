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

           
          $("#main-content .wrapper").append(this.$el);
          this.$el.find('#analysesTags').tagsInput({
            /*'autocomplete_url': url_to_autocomplete_api,
            'autocomplete': { option: value, option: value},*/
            'height':'200px',
            'width':'300px',
            'interactive':true,
            'defaultText':'Ajoutez une analyse',
            /*'onAddTag':callback_function,
            'onRemoveTag':callback_function,
            'onChange' : callback_function,*/
            'removeWithBackspace' : true,
            /*'minChars' : 0,
            'maxChars' : 0 //if not provided there is no limit,*/
            'placeholderColor' : '#666666'
          });
          return this;
        }
    });
    
    return patientProfile_vw;
});