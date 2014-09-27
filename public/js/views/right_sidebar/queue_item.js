define(
    [
        'jquery',
        'backbone',
        'underscore',
        //'js/models/queue_md',
        'text!templates/right_sidebar/queue_item.html'
    ],function($,Backbone,_,/*Queue_md,*/Template){
    
    var queue_item_vw = Backbone.View.extend({
        className:'prog-row',
        initialize:function(){
        },
        template: _.template(Template),
        render: function(){
            this.$el.html(this.template());
            return this;
        }
    });
    
    return queue_item_vw;
});