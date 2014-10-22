define(
    [
        'jquery',
        'backbone',
        'underscore',
        'text!templates/addMedicModal.html'
    ],function($,Backbone,_,Template){
    
    var addMedicModal = Backbone.View.extend({
        className:'modal fade',
        id:'prescriptionMedAdd',
        tagName: 'div',
        events: {
            "click div.modal-footer button.btn:first-child": "ends",
            "click div.modal-footer button.btn:nth-child(2)": "addOne",
            "click div.modal-footer button.btn:last-child": "addNew"
        },
        ends:function(event){
            event.preventDefault();
            this.$el.modal('hide');
        },
        addOne:function(event){
            event.preventDefault();
             this.addToConsultation({
                label:this.$el.find('.medName').val(),
                traitementPeriod:this.$el.find('.dpd1').val()+this.$el.find('.dpd2').val(),
                unite:this.$el.find('.unite').val(),
                every:this.$el.find('.every').val(),
                meal:this.$el.find('.meal').val(),
                note:this.$el.find('.note').val()
            });
            this.$el.modal('hide');
        },
        addNew:function(event){
            event.preventDefault();
            this.addToConsultation({
                label:this.$el.find('.medName').val(),
                traitementPeriod:'de '+this.$el.find('.dpd1').val()+' à '+this.$el.find('.dpd2').val(),
                unite:this.$el.find('.unite').val(),
                every:this.$el.find('.every').val(),
                meal:this.$el.find('.meal').val(),
                note:this.$el.find('.note').val()
            });
            //$(this.el).modal('hide');
        },
        addToConsultation:function(medicine){
            var newListMeds=_.clone(this.newConsultation.get("medicamentsList"));
            newListMeds.push(medicine);
            this.newConsultation.set("medicamentsList",newListMeds);
        },
        initialize:function(newConsultation){
            var self=this;
            this.newConsultation=newConsultation;
            $(this.el).on('hidden.bs.modal', function (e) {
              self.close();
            });
        },
        template: _.template(Template),
        render: function(){
            this.$el.html(this.template());
           /* this.$el.attr({
                "tabindex":"-1",
                "role":"dialog",
                "aria-hidden":"true"
            });*/
            var self=this;
            /* Initializations */
            var nowTemp = new Date(),
            now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
            
            this.$el.find('#medicalDose .btn:first-of-type').on('click', function() {
                self.$el.find('#medicalDose .spinner-input').val( parseInt(self.$el.find('#medicalDose .spinner-input').val(), 10) + 1);
            });
            this.$el.find('#medicalDose .btn:last-of-type').on('click', function() {
                if(self.$el.find('#medicalDose .spinner-input').val()>0)self.$el.find('#medicalDose .spinner-input').val( parseInt(self.$el.find('#medicalDose .spinner-input').val(), 10) - 1);
            });

            var checkin =this.$el.find('.dpd1').datepicker({
                onRender: function(date) {
                    return date.valueOf() < now.valueOf() ? 'disabled' : '';
                }
            }).on('changeDate', function(ev) {
                if (ev.date.valueOf() > checkout.date.valueOf()) {
                    var newDate = new Date(ev.date)
                    newDate.setDate(newDate.getDate() + 1);
                    checkout.setValue(newDate);
                }
                checkin.hide();
                self.$el.find('.dpd2')[0].focus();
            }).data('datepicker');

            var checkout = this.$el.find('.dpd2').datepicker({
                onRender: function(date) {
                    return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
                }
            }).on('changeDate', function(ev) {
                checkout.hide();
            }).data('datepicker');
            /* end initialization*/
            

            $(this.el).modal('show');
            return this;
        }
    });
    
    return addMedicModal;
});