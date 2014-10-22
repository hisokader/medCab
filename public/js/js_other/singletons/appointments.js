define(
    [
        'js/collections/appointment_cl'
    ],function(Appointment_cl){ 
        var instance = null;
        getInstance = function(){
            if(instance === null){
                instance = new Appointment_cl();
                instance.fetch({
                    success:function(collection, response, options){
                        console.log("appointment singleton");
                    },
                    error:function(collection, response, options){
                        console.log("error appointment singleton");
                    }
                });
            }
            return instance;
        };
        return getInstance();
});