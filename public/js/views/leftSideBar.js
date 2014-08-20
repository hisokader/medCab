define(
    [
        'backbone',
        'underscore',
        'js/models/session',
        'text!templates/leftSideBar.html'
    ],function(Backbone,_,Session,Template){
    
    var leftSideBar_vw = Backbone.View.extend({
        tagName: 'aside',
        initialize:function(){
        
        },
        template: _.template(Template),
        render: function(){
            var role=(eval(Session.get('user'))).role;
            var colFilterRole=this.collection.where({"role":role});
            this.$el.html(this.template({col:new Backbone.Collection(colFilterRole).toJSON()}));
          return this;
        }
    });
    
    return leftSideBar_vw;
});