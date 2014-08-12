define(['backbone','underscore','../collections/menu_cl','text!../../../../templates/template.html'],function(Backbone,_,menu_cl,Template){
    var leftSideBar_vw = Backbone.View.extend({
        el:$('#sidebar'),
        initialize:function(){
        },
        template: _.template(Template),
        render: function(){
            this.$el.html(this.template({col:this.collection.toJSON()}));
            console.log(this.el);
          return this;
        }
    });
    
    return leftSideBar_vw;
});