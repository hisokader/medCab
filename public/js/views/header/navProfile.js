define(
    [
        'jquery',
        'backbone',
        'underscore',
        'js/models/session',
        'text!templates/navProfile.html'
    ],function($,Backbone,_,Session,Template){
    
    var navProfile_vw = Backbone.View.extend({
        tagName: 'div',
        className: 'top-nav clearfix',
        events: {
            "click ul.top-menu .logout li a[href=#logout]": "logoutAction"
        },
        initialize:function(){
        },
        logoutAction:function(event){
            var self=this;
            event.preventDefault();
            var session=new Session();
            if(session.isAuthenticated())
                $.ajax({
                    type: "GET",
                    url: "/logout",
                    success: function(resInfo, textStatus, jqXHR){
                        if(resInfo.status){
                            session.clear();
                            location.href="/#login";
                        }
                    },
                    error: function(error, textStatus, jqXHR){
                        alert(JSON.stringify(error));
                    }
                });
        },
        template: _.template(Template),
        render: function(){
            var session=new Session(),
            nameUser=eval(session.get('user')).nom;
            this.$el.html(this.template({name:nameUser}));
            this.renderSubView();
          return this;
        }
    });
    
    return navProfile_vw;
});