define(
    [
        'jquery',
        'backbone',
        'underscore',
        'text!templates/messageBoxes/confirme.html'
    ],function($,Backbone,_,Template){
    
    var confirme = Backbone.View.extend({
        className:'modal fade',
        id:'myModal',
        tagName: 'div',
        events: {
            "click div.modal-footer button.btn:last-child": "confirmefn"
        },
        confirmefn:function(event){
            event.preventDefault();
            if(this.cb) this.cb();
            $(this.el).modal('hide');
        },
        initialize:function(model,cb){
            if(_.isFunction(cb))this.cb=cb;
            this.model=model;
            var self=this;
            $(this.el).on('hidden.bs.modal', function (e) {
              self.close();
            });
        },
        template: _.template(Template),
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.attr({
                "tabindex":"-1",
                "role":"dialog",
                "aria-labelledby":this.model.title,
                "aria-hidden":"true"
            });
            $(this.el).modal('show');
            return this;
        }
    });
    
    return confirme;
});