define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/collections/patient_cl',
        'text!templates/patientstable.html',
        'js/views/patientTableItem',
        'js/views/viewsContainerView',
        'js/models/template/viewsContainer_md',
        'panelslideinit'
    ],function($,_,Backbone,Patients_cl,Template,patientTableItem_vw,viewsContainerView,viewsContainerMd,panelSlideInit){
    
    var patientsTable_vw = Backbone.View.extend({

        template: _.template(Template),
        events: {
           
        },
        initialize:function(col){
            this.collection = col;
            this.subViews=[];
        },
        render: function(){
            var self=this,x=null;
            var patientsTableAttributes={
                selector:"patientsTable",
                headers:["","Nom et prénom", "Sexe", "Age", "Tel", "Actions"]
            };

            self.$el.html(self.template({tableAttributes:patientsTableAttributes}));

            self.collection.forEach(function(element, index, list){
                self.subViews.push(new patientTableItem_vw(element));
            });
            self.renderSubView("table."+patientsTableAttributes.selector+" tbody");
    
            /* init table */

            self.ListPatContainer = new viewsContainerView(new viewsContainerMd({
                        "title": "Liste des patients",
                        "largeur":"col-sm-12"
                    }), self).render();


            $("#main-content .wrapper").append(self.ListPatContainer.$el);
            $("#main-content table."+patientsTableAttributes.selector).dataTable({
                "aoColumnDefs": [
                    { "bSortable": false, "aTargets": [ 0 ] }
                ]
            });

            panelSlideInit();

            return this.ListPatContainer;
        }
    });
    
    return patientsTable_vw;
});