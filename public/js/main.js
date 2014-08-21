define([
    'jquery',
    'backbone',
    'router',
    'bootstrap'
],
    function ($,Backbone,Router,Bootstrap) {
        Backbone.View.prototype.subViews=null;
        Backbone.View.prototype.close=function(){
            _.each(this.subViews,function(subViewsItem, index, list){
                var item=this.subViews.pop();
                item.close();
            },this);
            this.remove();
        };
        Backbone.View.prototype.renderSubView=function(){
            if(this.subViews != null && this.subViews.length>0)
            {
                _.each(this.subViews,function(subViewsItem,index,list){
                    this.$el.append(subViewsItem.render().$el);
                },this);
            }
        };
        new Router();
        Backbone.history.start({root: "/"});
});