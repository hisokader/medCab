define(
    [
        'jquery',
        'backbone',
        'underscore',
        '../models/session',
        'text!templates/navProfile.html'
    ],function($,Backbone,_,Session,Template){
    
    var main_vw = Backbone.View.extend({
        el:$('body'),
        initialize:function(){
            this.subViews=[];
        },
        template: _.template(Template),
        render: function(){

          return this;
        }
    });
    
    return main_vw;
});