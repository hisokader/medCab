define(
    [
        'jquery',
        'backbone',
        'underscore',
        'js/collections/menu_cl',
        'js/views/header/header',
        'js/views/leftSideBar',
        'text!templates/layout.html',
        'initscript'
    ],function($,Backbone,_,Menu_cl,Header,LeftSideBar,Template,initScript){
    
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
            initScript();
            return this;
        }
    });
    
    return layout_vw;
});