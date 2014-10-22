define(
    [
        'jquery',
        'backbone',
        'underscore',
        'js/models/session',
        'js/models/user_md',
        'text!templates/navProfile.html',
        'js/views/editUserModal',
        'js/views/editUserPasswordModal'
    ],function($,Backbone,_,Session,UserModel,Template,editUserModal,editUserPasswordModal){
    
    var navProfile_vw = Backbone.View.extend({
        tagName: 'div',
        className: 'top-nav clearfix',
        events: {
            'click .editProfile': 'editProfile',
            'click .editPassword': 'editPassword',
            "click ul.top-menu .logout li a[href=#logout]": "logoutAction"
        },
        initialize:function(){
            this.session=new Session();
            this.currentUser = new UserModel();
            this.currentUser.set('_id', eval(this.session.get('user'))._id);
            this.currentUser.set('nom', eval(this.session.get('user')).nom);
            this.currentUser.set('prenom', eval(this.session.get('user')).prenom);
            this.currentUser.set('username', eval(this.session.get('user')).username);
            this.currentUser.set('password', eval(this.session.get('user')).password);
            this.currentUser.set('role', eval(this.session.get('user')).role);
            this.currentUser.set('salt', eval(this.session.get('user')).salt);

            _.bindAll(this, "render");
            this.currentUser.bind('change', this.render);
        },

        editProfile: function() {
            var modal = new editUserModal(this.currentUser).render();      
        },

        editPassword: function() {
            var modal = new editUserPasswordModal(this.currentUser).render();       
        },

        logoutAction:function(event){
            var self=this;
            event.preventDefault();
            if(self.session.isAuthenticated())
                $.ajax({
                    type: "GET",
                    url: "/logout",
                    success: function(resInfo, textStatus, jqXHR){
                        if(resInfo.status){
                            self.session.clear();
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
            nameUser=this.currentUser.get('nom')+' '+this.currentUser.get('prenom');
            this.$el.html(this.template({name:nameUser}));
            this.renderSubView();
          return this;
        }
    });
    
    return navProfile_vw;
});