define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/views/ajoutPatient',
        'js/views/patientBarListView',
        'js/views/viewsContainerView',
        'js/models/template/viewsContainer_md',
        'js/collections/patient_cl',
        'stepsinit',
        'slimscrollinit',
        'panelslideinit'
    ],function($,_,Backbone,ajoutP_vw,patientBarListView,viewsContainerView,viewsContainerMd,Patient_cl,stepsInit,slimScrollInit,panelSlideInit){
    
    var ajoutPatientContainer_vw = Backbone.View.extend({


        initialize:function(col){
            var self=this;
            this.subViews=[];
            this.collection = col;
            this.collection.on('add', function(){
                this.rerenderWizard(self.collection); 
            },this);
            this.render();
        },

        initViewScripts: function(){

            $("#ajoutPatientForm").validate({
                rules: {
                    lastName: "required",
                    firstName: "required",
                    tel: {
                        digits: true,
                        minlength: 10
                    },
                    gsm: {
                        digits: true,
                        minlength: 10                  
                    }
                    //diagnostique: "required"
                },
                messages: {
                    lastName: "Veuillez saisir le nom du patient",
                    firstName: "Veuillez saisir le prénom du patient",
                    tel: {
                        digits: "Veuillez saisir seulement des chiffres",
                        minlength: "Le numéro du télephone doit être composé de 10 chiffres au moins"
                    },
                    gsm: {
                        digits: "Veuillez saisir seulement des chiffres",
                        minlength: "Le numéro du télephone doit être composé de 10 chiffres au moins"
                    }
                    /*diagnostique: {
                        required: "Veuillez saisir les détails du diagnostique"
                    }*/
                }
            });

            stepsInit();
            slimScrollInit('.listeP .listePItems .event-list', '342', 20);

            $('.default-date-picker').inputmask({"mask": "99/99/9999"});

            var dateNaissance = $('.default-date-picker').datepicker({ 
                format: 'dd/mm/yyyy' 
            }).on('changeDate', function(ev) {
                dateNaissance.hide(); 
            }).data('datepicker');
        },

        render: function(){

            var self = this;

            $('#main-content .wrapper').append(self.$el);

            self.addPatVw = new ajoutP_vw(self.collection);
            self.ListPatVw = new patientBarListView(self.collection);
            self.subViews.push(self.addPatVw);
            self.subViews.push(self.ListPatVw);
            self.renderSubView();

            self.initViewScripts();
            panelSlideInit();
            

            return this;
        },

        rerenderWizard: function(coll){
            var self = this;
            self.addPatVw.AddPatContainer.closeSubView(new ajoutP_vw(coll));
            self.initViewScripts();
        }

    });

    return ajoutPatientContainer_vw;
});