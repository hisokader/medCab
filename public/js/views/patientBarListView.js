define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!templates/patientBarList.html',
        'js/views/patientBarItemView',
        'js/views/viewsContainerView',
        'js/models/template/viewsContainer_md',
        'js/collections/patient_cl',
    ],function($,_,Backbone,Template,PatientBarItemView,viewsContainerView,viewsContainerMd,Patient_cl){
    

    var patientBarListeView = Backbone.View.extend({

        template: _.template(Template),

        initialize:function(col){

            var self=this;
            this.collection = col;
            this.subViews=[];
            this.$el.html(this.template());
            this.collection.on('add', function(){
                self.subViews.forEach(function(subview, index, list){ 
                    subview.close(self);
                }); 
                this.collection.forEach(function(element, index, list){   
                    self.subViews.push(new PatientBarItemView({model: element}));
                });
                self.renderSubView(".listeP .listePItems .event-list");
            },this);
        },

        events:{
            'keyup .searchP': 'recherche'
        },

        render: function () {
            
            var self=this;
            if(self.subViews){
                self.subViews.forEach(function(subview, index, list){ 
                    console.log(subview);
                }); 
            };

            this.collection.forEach(function(element, index, list){   
                self.subViews.push(new PatientBarItemView({model: element}));
            });

            self.renderSubView(".listeP .listePItems .event-list");
            
            
            self.ListPatContainer = new viewsContainerView(new viewsContainerMd({
                        "title": "Patients récement ajoutés",
                        "largeur":"col-sm-4"
                    }), self).render();
            

            return self.ListPatContainer;

        },

        recherche: function(){
            self=this;
            if(self.subViews){
                self.subViews.forEach(function(subview, index, list){ 
                    subview.close(self);
                });
            }; 
            var key = $('.searchP').val();
            var Exp = new RegExp('^[A-Za-z]*'+key+'[A-Za-z]*$', 'i');
            var FilterPatient = this.collection.filter( function(model){
                return Exp.test(model.get('lastName')) || Exp.test(model.get('firstName'));
            });   

            var colFilterPatient = new Backbone.Collection(FilterPatient);

            colFilterPatient.forEach(function(element, index, list){   
                self.subViews.push(new PatientBarItemView({model: element}));
            });
            self.renderSubView(".listeP .listePItems .event-list");
            
        }

    });
        
    return patientBarListeView;
});