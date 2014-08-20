define(
    [
        'jquery',
        'backbone',
        'underscore',
        'text!templates/header.html',
        'js/views/header/navProfile',
    ],function($,Backbone,_,Template,NavProfile){
    
    var header_vw = Backbone.View.extend({
        tagName: 'header',
        className: 'header fixed-top clearfix',
        initialize:function(){
            this.subViews = [];
            this.subViews.push(new NavProfile());
        },
        template: _.template(Template),
        render: function(){
            this.$el.html(this.template());
            this.renderSubView();
          return this;
        }
    });
    
    return header_vw;
});