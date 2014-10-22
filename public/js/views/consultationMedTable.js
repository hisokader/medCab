define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!templates/consultationMedTable.html'
    ],function($,_,Backbone,Template,AddMedicModal,consultation_md){
    
    var patientProfileTabsConsForm_vw = Backbone.View.extend({
        tagName:'table',
        className:'table table-bordered table-hovered',
        template: _.template(Template),
        events: {
            "click div.fa-hover i.fa-times": "deletMedLine"
        },
        deletMedLine:function(event){
            event.preventDefault();
            var indexToRemove=event.target.id.replace('line',''),
            self=this,
            rowToRemove=$(event.currentTarget.parentElement.parentElement.parentElement),
            parent=rowToRemove.parents('tbody');
            rowToRemove.fadeOut('fast',function(){
                self.consultation.get("medicamentsList").splice(indexToRemove,1);
                this.remove();

                if(parent.children().length==0)
                    parent.html('<tr><td colspan="5"> 0 medicaments pour cette consultation.</td></tr>').fadeIn('fast');
            });
            
        },
        initialize:function(consultation){
            this.consultation=consultation;
        },
        render: function(){
            this.$el.html(this.template({mediList:this.consultation.get("medicamentsList")}));       

          return this;
        }
    });
    return patientProfileTabsConsForm_vw;
});