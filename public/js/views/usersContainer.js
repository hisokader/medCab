define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/views/ajoutUser',
        'js/views/usersTable',
        'js/views/viewsContainerView',
        'js/models/template/viewsContainer_md',
        'js/collections/user_cl',
        'panelslideinit'
    ],function($,_,Backbone,ajoutUser_vw,UsersTable,viewsContainerView,viewsContainerMd,User_cl,panelSlideInit){
    
    var usersContainer_vw = Backbone.View.extend({


        initialize:function(col){
            var self=this;
            this.subViews=[];
            this.collection = col;
            this.collection.on('add', function(){
                //this.viderForm(); 
            },this);
            this.render();
        },

        initViewScripts: function(){

            var self = this;
            self.Pass = $("#Password").val();

            $("#ajoutUserForm").validate({
                rules: {
                    Nom: "required",
                    Prenom: "required",
                    Username: "required",
                    Password: {
                        required: true,
                        minlength: 6
                    },
                    PasswordConfirm: {
                        required: true,
                        equalTo: '#Password'
                    }
                },
                messages: {
                    Nom: "Veuillez saisir le nom d'utilisateur",
                    Prenom: "Veuillez saisir le prénom d'utilisateur",
                    Username: "Veuillez saisir un username",
                    Password: {
                        required: "Veuillez saisir le mot de passe",
                        minlength: "Le mot de passe doit être composé de plus de 6 caractères"
                    },
                    PasswordConfirm: {
                        required: "Veuillez confirmer le mot de passe",
                        equalTo: "les mots de passes ne sont pas identiques"
                    }
                }
            });

        },

        render: function(){

            var self = this;

            $('#main-content .wrapper').append(self.$el);

            self.addUserVw = new ajoutUser_vw(self.collection);
            self.UsersTableVw = new UsersTable(self.collection);
            self.subViews.push(self.addUserVw);
            self.subViews.push(self.UsersTableVw);
            self.renderSubView();

            self.initViewScripts();
            panelSlideInit();
            

            return this;
        },

    });

    return usersContainer_vw;
});