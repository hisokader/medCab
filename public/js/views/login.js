define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/models/session',
        'text!templates/login.html'
    ],function($,_,Backbone,Session,Template){
    
    var login_vw = Backbone.View.extend({
        el:$('body'),
        template: _.template(Template),
        events: {
            "click .form-signin .login-wrap button:first-of-type": "loginAction"
        },
        loginAction:function (event) {
            var self=this;
            event.preventDefault();
            console.log('login action bb');
            var data=$('.form-signin').serialize();
            console.log(data);
            $.ajax({
                type: "POST",
                url: 'login?'+data,
                success: function(sessionInfo, textStatus, jqXHR){
                    self.loginSuccess(sessionInfo, textStatus, jqXHR);
                },
                error: self.loginError
            });
        },
        loginSuccess:function(sessionInfo, textStatus, jqXHR){
            if(sessionInfo){
                Session.set('user',JSON.stringify(sessionInfo.user));
                Session.set('authenticated',true);
                this.remove();
                location.href = "/";
            }
        },
        loginError:function(error){
            console.log(error);
        },
        initialize:function(){
            _.bind(this.loginSuccess, this);
            _.bind(this.loginError, this);
            $('body').addClass("login-body");
        },
        render: function(){
            console.log('login vw rendred');
            this.$el.html(this.template());
          return this;
        }
    });
    
    return login_vw;
});