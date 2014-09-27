define(
    [
        'jquery',
        'backbone',
        'underscore',
        'js/views/right_sidebar/queue_item',
        'text!templates/right_sidebar/index.html',
        'js/js_other/socketio/io'
    ],function($,Backbone,_,Queue_item,Template,io){
    
    var queue_vw = Backbone.View.extend({
        className:'right-sidebar',
        tagName:'div',
        initialize:function(){
            this.socket=io;
            this.subViews = [];
            this.subViews.push(new Queue_item());
            this.subViews.push(new Queue_item());
        },
        template: _.template(Template),
        render: function(){
            console.log(this.socket);
            this.socket.emit('xevent', { my: 'data' });
            this.$el.html(this.template());
            this.renderSubView(".widget-container li");
            return this;
        }
    });
    
    return queue_vw;
});