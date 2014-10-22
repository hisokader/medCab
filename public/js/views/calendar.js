define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!templates/calendar.html',
        'js/models/appointment_md',
        'js/collections/appointment_cl',
        'js/views/addEventModal',
        'js/js_other/singletons/patients',
        'js/js_other/singletons/appointments',
        'js/views/messageBoxes/confirme',
        'js/models/template/messageBoxe',
        'js/views/viewsContainerView',
        'js/models/template/viewsContainer_md'
    ],function($,_,Backbone,Template,Appointement_md,Appointement_cl,AddEventModal,Patients,Appointments,confirmeMsgView,messageBoxesModel,viewsContainerView,viewsContainerMd){
    
    var calendar_vw = Backbone.View.extend({

        template: _.template(Template),
        events: {
            "click button.deleteAnEvent" : "deletAnEvent"
        },
        deletAnEvent:function(event){
            event.preventDefault();
            var self=this;
            if(this.currentPopover)
                    this.currentPopover.popover('hide');
            var modal = new confirmeMsgView(new messageBoxesModel({
                "title": "Supprimer un rendez vous",
                "text":"voulez-vous vraiment supprimer ce rndez vous.",
                "type":"dialoge",
                "confirmation":"Supprimer"
            }),function(){
                var id=$(event.currentTarget).attr("class").split(' ')[5],
                eventToModify=self.appointments.findWhere({_id:id});
                eventToModify.destroy({
                    success:function(model, response, options){
                        self.appointments.remove(eventToModify);
                    },error:function(model, response, options){
                        console.log("erreur durrant l'operation de suppression du patient.");
                    }
                });
            }).render();
            // rerender the popover, if the user click null 
            // self.currentPopover.popover('show');
        },
        initialize:function(){
            this.subViews=[];
            this.allPatients=Patients;
            this.appointments=Appointments;
            this.currentPopover=null;
            this.calendar=null;
            this.appointments.on('remove',function(model,list,x){
                console.log(x);
                this.calendar.fullCalendar( 'removeEvents',model.get('_id'));
            },this);
            /* this had to be replaced with values from DB or config file */
            this.allEvents=[
                {id:0,label:'Consultation',cssClass:'label-primary',color:'#59ace2'},
                {id:1,label:'Controle',cssClass:'label-success',color:'#a9d86e'},
                {id:2,label:'Autre',cssClass:'label-inverse',color:'#344860'}
            ];
             /*/////////////////////////////////////////////////////////*/
        },
        render: function(){
            var self=this,
            date = new Date(),
            d = date.getDate(),
            m = date.getMonth(),
            y = date.getFullYear();
            this.$el.html(this.template({allEvents:this.allEvents}));
             /* initialize the external events
             -----------------------------------------------------------------*/
            this.$el.find('#external-events div.external-event').each(function() {
                // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                // it doesn't need to have a start or end
                var classType=$(this).attr('class').split(' ');
                var eventObject = {
                    title: $.trim($(this).text()), // use the element's text as the event title
                    className:classType[2],
                    type:classType[3]
                };
                // store the Event Object in the DOM element so we can get to it later
                $(this).data('eventObject', eventObject);

                // make the event draggable using jQuery UI
                $(this).draggable({
                    zIndex: 999,
                    revert: true,      // will cause the event to go back to its
                    revertDuration: 0  //  original position after the drag
                });
            });


            var FCEvents=this.appointments.map(function(element, index,list){
                var eventTypesObject=self.allEvents[element.get('type')];
                return {
                    title: element.get('title'),
                    id: element.get('_id'),
                    start: element.get('fullDate'),
                    color:eventTypesObject.color,
                    patient:element.get('patientId'),
                    label:eventTypesObject.label,
                    //end: new Date(y, m, d, 14, 0),
                    allDay: true
                }; 
            });
            /* initialize the calendar
            -----------------------------------------------------------------*/
            this.calendar=this.$el.find('#calendar');
            this.calendar.fullCalendar({
                hiddenDays: [0],
                handleWindowResize:true,
                lang:'fr',
                //allDayDefault:true,
                eventStartEditable: true,
                eventDurationEditable:false,
                droppable: true,
                events: FCEvents,
                drop: function(date, allDay,ui) { 
                    var originalEventObject = $(this).data('eventObject');
                    self.subViews[0]=new AddEventModal({
                      "fullDate":  date.format('L'),
                      "type": originalEventObject.type
                    },self.allEvents,self.allPatients);
                    self.subViews[0].render();
                    // is the "remove after drop" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the "Draggable Events" list
                        $(this).remove();
                    }
                },
                eventRender: function(event, element) {
                    element.popover({
                        title: '<strong>'+event.label+'</strong>',
                        placement: 'auto',
                        //delay:10,
                        html: true,
                        animation:'true',
                        content: function(){
                            return 'pour <strong><a href="#patients/'+event.patient+'">'+event.title+'</a></strong>, le '+event.start.format('ll')+'. <hr style="margin:12px auto 8px auto;"/><button class="btn btn-danger btn-xs deleteAnEvent pull-right '+event.id+'" style="margin-bottom:10px;"><i class="fa fa-trash-o"></i></button>';
                        },
                        container: self.$el
                    });
                },
                eventClick: function(calEvent, jsEvent, view) {
                    if(self.currentPopover && self.currentPopover[0]!==$(this)[0])
                        self.currentPopover.popover('hide');
                    self.currentPopover=$(this).popover('show');
                    console.log($(this));
                },/*,
                eventMouseover: function(calEvent, jsEvent, view) {
                    console.log('Event: ' + calEvent.title);
                }*/
                 eventDrop: function(event, delta, revertFunc) {
                    console.log(event.title + " was dropped on " + event.start.format());
                    //a changer par modale confirme

                    if (!confirm("Are you sure about this change?")) {
                        revertFunc();
                    }else{
                        var eventToModify=self.appointments.findWhere({_id:event.id});
                        eventToModify.save({fullDate:event.start.format()});
                    }
                },
                eventDragStart:function( event, jsEvent, ui, view ) { 
                     if(self.currentPopover)self.currentPopover.popover('hide');
                }
            });

            this.CalendarContainer = new viewsContainerView(new viewsContainerMd({
                        "title": "Agenda",
                        "largeur":"col-sm-12"
                    }), this).render();

            $("#main-content .wrapper").append(this.CalendarContainer.$el);

            this.calendar.fullCalendar('today');

            return this.CalendarContainer;
        }
    });

    return calendar_vw;
});