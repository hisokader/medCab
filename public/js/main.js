define([
    'jquery',
    'backbone',
    'router',
    'bootstrap'
],
    function ($,Backbone,Router,Bootstrap) {
        var mainRouter;
        Backbone.View.prototype.subViews=null;
        Backbone.View.prototype.close=function(){
            _.each(this.subViews,function(subViewsItem, index, list){
                var item=this.subViews.pop();
                item.close();
            },this);
            this.remove();
        };
        Backbone.View.prototype.renderSubView=function(elToRenderTo){
            if(this.subViews != null && this.subViews.length>0)
            {
                if(!elToRenderTo){
                    _.each(this.subViews,function(subViewsItem,index,list){
                        this.$el.append(subViewsItem.render().$el);
                    },this);
                }
                else{
                    _.each(this.subViews,function(subViewsItem,index,list){
                       $(elToRenderTo).append(subViewsItem.render().$el);
                    },this);
                }
            }
        };
        mainRouter = new Router();
        Backbone.history.start({root: "/"});
});