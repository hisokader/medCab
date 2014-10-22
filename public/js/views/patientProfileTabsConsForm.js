define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!templates/patientProfileTabsConsForm.html',
        'js/views/addMedicModal',
        'js/models/consultation_md',
        'js/views/consultationMedTable'
    ],function($,_,Backbone,Template,AddMedicModal,consultation_md,ConsultationMedTable){
    
    var patientProfileTabsConsForm_vw = Backbone.View.extend({
        id:'consultationForm',
        className:'tab-pane active',
        template: _.template(Template),
        events: {
            "click button.addMedicamentButton": "showMediForm"
        },
        showMediForm:function(event){
            event.preventDefault();
            new AddMedicModal(this.newConsultation).render();
            console.log(this.newConsultation.get("medicamentsList"));
        },
        initialize:function(){
            this.newConsultation=new consultation_md();
            this.subViews=[];
            this.subViews.push(new ConsultationMedTable(this.newConsultation));
            this.newConsultation.on("change:medicamentsList",function(model, name){
                console.log(this.newConsultation.get("medicamentsList"));
                this.subViews.pop().close();
                this.subViews.push(new ConsultationMedTable(this.newConsultation));
                this.renderSubView(".prescription");
            },this);
        },
        render: function(){
            var self=this,
            nowTemp = new Date(),
            now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);;
            this.$el.html(this.template());
            this.renderSubView(".prescription");
            /* initializing */
            var dateConsultation=this.$el.find('.default-date-picker').datepicker({
                format: 'mm-dd-yyyy'
            }).on('changeDate', function(ev) {
                dateConsultation.hide();
            }).data('datepicker');

            
            //this.$el.find('#analysesTags').tagsInput();        

          return this;
        }
    });
    return patientProfileTabsConsForm_vw;
});