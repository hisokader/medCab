define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!templates/patientProfileTabsConsForm.html'
    ],function($,_,Backbone,Template){
    
    var patientProfileTabsConsForm_vw = Backbone.View.extend({
        id:'consultationForm',
        className:'tab-pane active',
        template: _.template(Template),
        initialize:function(){

        },
        render: function(){
            var self=this,
            nowTemp = new Date(),
            now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);;
            this.$el.html(this.template());
            this.$el.find('.default-date-picker').datepicker({
                format: 'mm-dd-yyyy'
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

          return this;
        }
    });
    return patientProfileTabsConsForm_vw;
});