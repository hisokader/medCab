define(
    [
        'jquery',
        'backbone',
        'underscore',
        'js/models/session',
        'text!templates/navProfile.html'
    ],function($,Backbone,_,Session,Template){
    
    var navProfile_vw = Backbone.View.extend({
        el:$('header.header'),
        initialize:function(){
        },
        template: _.template(Template),
        render: function(namex){
            console.log(namex);
            this.$el.append(this.template({name:namex}));
          return this;
        }
    });
    
    return navProfile_vw;
});