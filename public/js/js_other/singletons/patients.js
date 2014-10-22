define(
    [
        'js/collections/patient_cl'
    ],function(Patient_cl){ 
        var instance = null;
        getInstance = function(){
            if(instance === null){
                instance = new Patient_cl();
                instance.fetch({
                    success:function(collection, response, options){
                        console.log("patient singleton");
                    },
                    error:function(collection, response, options){
                        console.log("error patient singleton");
                    }
                });
            }
            return instance;
        };
        return getInstance();
});