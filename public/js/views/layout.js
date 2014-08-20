define(
    [
        'jquery',
        'backbone',
        'underscore',
        'js/collections/menu_cl',
        'js/views/header/header',
        'js/views/leftSideBar',
        'text!templates/layout.html'
    ],function($,Backbone,_,Menu_cl,Header,LeftSideBar,Template){
    
    var layout_vw = Backbone.View.extend({
        tagName: 'section',
        id: 'container',
        initialize:function(){
            this.subViews = [];
            this.subViews.push(new Header());
            this.subViews.push(new LeftSideBar({collection:new Menu_cl()}));
        },
        template: _.template(Template),
        render: function(){
            this.renderSubView();
            this.$el.append(this.template());
            $('body').append(this.$el);
            return this;
        }
    });
    
    return layout_vw;
});