define([
	'backbone',
	'../models/user_md'
	],function(Backbone,user_md){
	    var user_cl = Backbone.Collection.extend({
		model:user_md,
		url:'/users',
		initialize:function(){
		}
	});
    return user_cl;
});