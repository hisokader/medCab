define([
	'backbone',
	'../models/appointment_md'
	],
	function(Backbone,appointment_md){
	    var appointment_cl = Backbone.Collection.extend({
	    	url:'/appointments',
			model:appointment_md
		});
	    return appointment_cl;
	}
);