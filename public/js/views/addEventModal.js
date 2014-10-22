define(
    [
        'jquery',
        'backbone',
        'underscore',
        'text!templates/addEventModal.html',
        'js/js_other/singletons/appointments'
    ],function($,Backbone,_,Template,Appointments){
    
    var addEventModal = Backbone.View.extend({
        className:'modal fade',
        id:'calendarEventAdd',
        tagName: 'div',
        template: _.template(Template),
        events: {
            "click div.modal-footer .btn-primary": "ends",
            "click div.modal-footer .btn-default": "cancel"
        },
        ends:function(event){
            event.preventDefault();
            var dateTab=this.$el.find("input.default-date-picker").val().split('/'),
            colorsTab=['#59ace2','#a9d86e','#344860'],
            type=this.$el.find("select.every").val();
            // we need to copy it, so that multiple events don't have a reference to the same object
            var eventObject = {
                title: this.$el.find("#patientSelect2").select2("data").text, // use the element's text as the event title
                color:colorsTab[type]
            };
            Appointments.create({
              "fullDate": dateTab[2]+'-'+dateTab[1]+'-'+dateTab[0],
              "patientId":this.$el.find("#patientSelect2").select2("data").id,
              "title": this.$el.find("#patientSelect2").select2("data").text,
              "type": type,
              "isConfirmed": ""
            });

            var copiedEventObject = $.extend({}, eventObject);

            // assign it the date that was reported
            
            copiedEventObject.start = $.fullCalendar.moment(dateTab[2]+'-'+dateTab[1]+'-'+dateTab[0]);
            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            this.$el.modal('hide');
        },
        cancel:function(event){
            event.preventDefault();
            this.$el.modal('hide');
        },

        initialize:function(event,allEvents,allPatients){
           var self=this;
            this.event=event;
            this.allEvents=allEvents;
            this.allPatients=allPatients;
        },
        render: function(){
            this.$el.html(this.template({event:this.event,allEvents:this.allEvents,allPatients:this.allPatients}));
            this.$el.attr({
                "tabindex":"-1",
                "role":"dialog",
                "aria-hidden":"true"
            });
            var self=this;
            /* initializing */
            var dateConsultation=this.$el.find('.default-date-picker').datepicker({
                format: 'dd/mm/yyyy'
            }).on('changeDate', function(ev) {
                dateConsultation.hide();
            }).data('datepicker');

            this.$el.find('#patientSelect2').select2({
                placeholder: "Choisissez un patient ...",
                allowClear: true,
                minimumInputLength: 1,
                query: function (query) {
                    var Exp = new RegExp('^[A-Za-z]*'+query.term+'[A-Za-z]*$', 'i'),
                        FilterPatient = self.allPatients.filter( function(model){
                            return Exp.test(model.get('lastName')) || Exp.test(model.get('firstName'));
                        }), dataToRender={};
                    dataToRender.results=_.map(FilterPatient, function(object, index,list){ 
                        return {id:object.get('_id'),text:object.get('firstName')+' '+object.get('lastName')};
                    });
                    query.callback(dataToRender);
                }
            });
            this.$el.find('.timepicker-24').timepicker({
                autoclose: true,
                minuteStep: 1, 
                showInputs: false,
                template: 'dropdown',
                modalBackdrop: true,
                showSeconds: true,
                showMeridian: false
            });
            this.$el.on('hidden.bs.modal', function (e) {
              self.close();
            });
            this.$el.modal('show');
            return this;
        }
    });
    
    return addEventModal;
});