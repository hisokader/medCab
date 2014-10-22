define(['backbone','../models/template/menu_md'],function(Backbone,menu_md){
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
				"libelle":     "Patient",
				"role":"1",
				"subMenu":[
					{"route":  "#addpatient","libelle":  "Nouveau patient"},
	              	{"route":  "#patients","libelle":  "Liste des patients"}
	            ]
			},
			{
				"icon":  "fa-pencil-square-o",
				"libelle":     "Consultation",
				"role":"1",
				"subMenu":[
					{"route":  "#ajoutconsultation","libelle":  "Nouvelle consultation"},
	              	{"route":  "#listeconsultations","libelle":  "Liste des consultations"}
	            ]
			},
			{
				"icon":  "fa-calendar",
				"libelle":     "Agenda",
				"route":"#calendar",
				"role":"1",
				"subMenu":null
			},
			{
				"icon":  "fa-keyboard-o",
				"libelle":     "Comptabilite",
				"role":"1",
				"subMenu":null
			}
	     ];
	     this.add(data);
      }
    });
    return menu_cl;
});