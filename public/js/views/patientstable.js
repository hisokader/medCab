define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/collections/patient_cl',
        'text!templates/patientstable.html',
        'js/views/patientTableItem'
    ],function($,_,Backbone,Patients_cl,Template,patientTableItem_vw){
    
    var patientsTable_vw = Backbone.View.extend({
        el:'#main-content',
        template: _.template(Template),
        events: {
           
        },
        initialize:function(){
            this.subViews=[];
        },
        render: function(){
            var self=this,x=null;
            var patientsTableAttributes={
                title:"Patients",
                selector:"patientsTable",
                headers:["Nom et prénom", "Sexe", "Age", "Tel", "Actions"]
            };
            this.collection=new Patients_cl();
            self.$el.append(self.template({tableAttributes:patientsTableAttributes}));
            this.collection.fetch({
                success:function(){
                self.collection.forEach(function(element, index, list){
                    self.subViews.push(new patientTableItem_vw(element));
                });
                self.renderSubView("table."+patientsTableAttributes.selector+" tbody");
            },error:function(){
                console.log('error fetch()');
            }}).then(function(){                
                $("#main-content table."+patientsTableAttributes.selector).dataTable();
            });
            
          return this;
        }
    });
    
    return patientsTable_vw;
});