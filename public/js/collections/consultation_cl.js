define(['backbone','../models/consultation_md'],function(Backbone,consultation_md){
    var consultation_cl = Backbone.Collection.extend({
	model:consultation_md
	});
    return consultation_cl;
});