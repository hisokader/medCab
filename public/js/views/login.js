define(
    [
        'jquery',
        'backbone',
        'underscore',
        'text!../../../../templates/login.html'
    ],function($,Backbone,_,Template){
    
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
                success: self.loginSuccess,
                error: self.loginError
            });
        },
        loginSuccess:function(sessionInfo, textStatus, jqXHR){
            console.log(sessionInfo);
            if(sessionInfo)location.href = "/";
        },
        loginError:function(error){
            console.log(error);
        },
        initialize:function(){
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