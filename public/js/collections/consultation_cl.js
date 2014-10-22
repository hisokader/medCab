define(['backbone','../models/consultation_md'],function(Backbone,consultation_md){
    var consultation_cl = Backbone.Collection.extend({
		model:consultation_md,
		initialize:function(){
			var data=[
				{
					"Patient":  "1",
					"DateConsultation": "12/09/2014",
					"Type": "Contrôle",
					"Observations": "observation pour Contrôle",
					"DatePayement": "01/10/2014",
					"Montant": "200",
					"Avance": "100",
					"Reste": "100",
				},
				{
					"Patient":  "1",
					"DateConsultation": "03/07/2014",
					"Type": "Consultation",
					"Observations": "observation pour Consultation",
					"DatePayement": "06/12/2013",
					"Montant": "500",
					"Avance": "150",
					"Reste": "250",
				},
				{
					"Patient":  "1",
					"DateConsultation": "19/04/2014",
					"Type": "Consultation",
					"Observations": "observation pour Consultation",
					"DatePayement": "06/12/2013",
					"Montant": "600",
					"Avance": "480",
					"Reste": "120",
				},
				{
					"Patient":  "1",
					"DateConsultation": "23/01/2014",
					"Type": "Contrôle",
					"Observations": "observation pour Contrôle",
					"DatePayement": "01/10/2014",
					"Montant": "300",
					"Avance": "120",
					"Reste": "100",
				}
			];
			this.add(data);
		}
	});
    return consultation_cl;
});