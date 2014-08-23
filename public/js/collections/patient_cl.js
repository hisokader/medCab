define([
	'backbone',
	'../models/patient_md'
	],function(Backbone,patient_md){
	    var patient_cl = Backbone.Collection.extend({
		model:patient_md,
		url:'/patients',
		initialize:function(){
		}
	});
    return patient_cl;
});