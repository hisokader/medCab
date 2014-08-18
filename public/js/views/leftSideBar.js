define(
    [
        'backbone',
        'underscore',
        'js/collections/menu_cl',
        'text!templates/template.html'
    ],function(Backbone,_,menu_cl,Template){
    
    var leftSideBar_vw = Backbone.View.extend({
        el:$('#sidebar'),
        initialize:function(role){
        
        },
        template: _.template(Template),
        render: function(role){
        var colFilterRole=this.collection.where({"role":role});
            this.$el.html(this.template({col:new Backbone.Collection(colFilterRole).toJSON()}));
          return this;
        }
    });
    
    return leftSideBar_vw;
});