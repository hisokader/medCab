define(
    [
        'jquery',
        'backbone',
        'underscore',
        'text!templates/viewsContainer.html'
    ],function($,Backbone,_,Template){
    
    var ajoutPatientContainer_vw = Backbone.View.extend({

        template: _.template(Template),

        initialize:function(model, elm, empl){
            this.model = model;
            this.subViews=[];
            this.subViews.push(elm);
        },

        render: function(){
            
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.find(".panel-body").html(this.subViews[0].$el);

            return this;
        },

        closeSubView: function(view){
            this.subViews.pop().remove();
            this.subViews.push(view); 
            this.$el.find(".panel-body").html(this.subViews[0].$el);
        }


    });

    return ajoutPatientContainer_vw;
});