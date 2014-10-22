define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/models/session',
        'js/models/user_md',
        'text!templates/ajoutUser.html',
        'js/views/messageBoxes/confirme',
        'js/models/template/messageBoxe',
        'js/views/viewsContainerView',
        'js/models/template/viewsContainer_md'
    ],function($,_,Backbone,Session,userModel,Template,confirmeMsgView,messageBoxesModel,viewsContainerView,viewsContainerMd){
    
    var ajoutUsr_vw = Backbone.View.extend({

        template: _.template(Template),

        initialize:function(col){
            var self=this;
            //var session=new Session(),
            //RoleUser=session.get('user').role;
            self.$el.append(self.template());
            this.collection = col;
            //this.render();
            
        },

        events: {
            'submit': 'addUser'
        },

        addUser: function(e){
            e.preventDefault();
            var self = this;

            self.collection.create({
                nom: self.$el.find('#Nom').val(),
                prenom: self.$el.find('#Prenom').val(),
                role: self.$el.find('#Role').val(),
                username: self.$el.find('#Username').val(),
                password: self.$el.find('#Password').val()
            },
            {
                wait:true,
                success: function(model, response) {
                    var modal = new confirmeMsgView(new messageBoxesModel({
                        "title": "Ajout éffectué",
                        "text":"L'utilisateur a bien été ajouté !!",
                        "type":"successAlert",
                        "confirmation":"ok"
                    })).render(); 
                },
                error:function(model, response) {
                    if(response.status == 400){
                        var modal = new confirmeMsgView(new messageBoxesModel({
                            "title": "Duplicate Username",
                            "text":"Le username que vous avez saisis existe déja !!",
                            "type":"alert",
                            "confirmation":"ok"
                        })).render();
                    }else{
                        var modal = new confirmeMsgView(new messageBoxesModel({
                            "title": "Problème coté serveur",
                            "text":"L'utilisateur n'a pas été ajouté !!",
                            "type":"alert",
                            "confirmation":"ok"
                        })).render();
                    }
                }
            });
        },

        render: function(){

            var self = this;
            
            self.AddUserContainer = new viewsContainerView(new viewsContainerMd({
                "title": "Nouvel Utilisateur",
                "largeur":"col-sm-4"
            }), self).render();

            return self.AddUserContainer;
        }


    });

    return ajoutUsr_vw;
});