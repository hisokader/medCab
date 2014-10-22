define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!templates/usersTable.html',
        'js/views/userTableItem',
        'js/views/viewsContainerView',
        'js/models/template/viewsContainer_md'
    ],function($,_,Backbone,Template,userTableItem_vw,viewsContainerView,viewsContainerMd){
    
    var usersTable_vw = Backbone.View.extend({

        template: _.template(Template),
        events: {
           
        },
        initialize:function(col){
            var self=this;
            this.collection = col;
            this.subViews=[];

            this.usersTableAttributes={
                selector:"usersTable",
                headers:["Nom et prénom", "UserName", "Rôle", "Actions"]
            };

            self.$el.html(self.template({tableAttributes:self.usersTableAttributes}));

            this.collection.on('add', function(){
                self.subViews.forEach(function(subview, index, list){ 
                    subview.close(self);
                }); 
                this.collection.forEach(function(element, index, list){   
                    self.subViews.push(new userTableItem_vw(element));
                });
                self.renderSubView("table."+self.usersTableAttributes.selector+" tbody");
            },this);
        },
        render: function(){
            var self=this,x=null;

            self.collection.forEach(function(element, index, list){
                self.subViews.push(new userTableItem_vw(element));
            });
            self.renderSubView("table."+self.usersTableAttributes.selector+" tbody");
    
            /* init table */

            self.ListUsrContainer = new viewsContainerView(new viewsContainerMd({
                "title": "Liste des utilisateurs",
                "largeur":"col-sm-8"
            }), self).render();


            $("#main-content .wrapper").append(self.ListUsrContainer.$el);

            return this.ListUsrContainer;
        }
    });
    
    return usersTable_vw;
});