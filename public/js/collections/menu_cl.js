define(['backbone','../models/menu_md'],function(Backbone,menu_md){
    var menu_cl = Backbone.Collection.extend({
      model:menu_md,
      initialize:function(){
      	var data=[{
			"icon":  "fa-dashboard",
			"libelle":     "dashboard",
			"role":"1",
			"subMenu":null
			},
			{
			"icon":  "fa-users",
			"libelle":     "Patient"
			},
			{
			"icon":  "fa-pencil-square-o",
			"libelle":     "Consultation",
			"subMenu":[]
			},
			{
			"icon":  "fa-calendar",
			"libelle":     "Agenda"
			},
			{
			"icon":  "fa-keyboard-o",
			"libelle":     "Comptabilite",
			"role":"1"
			}
	     ];
	     this.add(data);
      }
    });
    return menu_cl;
});