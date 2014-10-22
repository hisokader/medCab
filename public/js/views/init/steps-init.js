define(['steps'], function () {
    
    var stepsInit=function (self, collect) {
        var wizard = $("#wizard").steps({
            headerTag: "h2",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            onStepChanging: function(event,indexC,indexP){

    			if($("#ajoutPatientForm").valid()){
    				return true;	
    			} 
	
        	},
        	onFinishing: function(event,indexC,indexP){
        		if($("#ajoutPatientForm").valid()){
					$("#ajoutPatientForm").submit();
                    return true;
                    //$("#wizard").steps();
				}
        	},

            onFinished: function(event, currentIndex) {
                //self.remove();
                //new addPatVw(collect);
            },
            
            labels: {
                finish: "Terminer",
                next: "Suivant",
                previous: "Précédent"
            }
        });
    }

    return stepsInit;


});