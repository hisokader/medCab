define(
    [
        'jquery',
        'backbone',
        'underscore',
        'js/models/session',
        'text!templates/navProfile.html'
    ],function($,Backbone,_,Session,Template){
    
    var navProfile_vw = Backbone.View.extend({
        tagName: 'div',
        className: 'top-nav clearfix',
        initialize:function(){

        },
        template: _.template(Template),
        render: function(){
            nameUser=eval(Session.get('user')).nom;
            this.$el.html(this.template({name:nameUser}));
            this.renderSubView();
          return this;
        }
    });
    
    return navProfile_vw;
});